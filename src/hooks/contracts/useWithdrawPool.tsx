import { useMixpanelAnalytics } from '@/hooks/analytics/useMixpanelAnalytics'
import { queryDelegationShares } from '@/queries/subgraph/queryDelegatedShares'
import { notification } from 'antd'
import { useEffect, useState } from 'react'
import { useWaitForTransaction } from 'wagmi'
import { apolloClient } from '../../config/apollo'
import chainConfig from '../../config/chain'
import { queryAccount } from '../../queries/subgraph/queryAccount'
import { queryPool } from '../../queries/subgraph/queryPool'

import { ethers } from 'ethers'
import {
  stakeTogetherABI,
  usePrepareStakeTogetherWithdrawPool,
  useStakeTogetherWithdrawPool
} from '../../types/Contracts'
import useTranslation from '../useTranslation'
import { WithdrawType } from '@/types/Withdraw'
import useEstimateTxInfo from '../useEstimateTxInfo'

export default function useWithdrawPool(
  withdrawAmount: string,
  poolAddress: `0x${string}`,
  enabled: boolean,
  accountAddress?: `0x${string}`
) {
  const { contracts, chainId } = chainConfig()
  const [notify, setNotify] = useState(false)
  const { registerWithdraw } = useMixpanelAnalytics()

  const [awaitWalletAction, setAwaitWalletAction] = useState(false)
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined)

  const [estimateGasCost, setEstimateGasCost] = useState(0n)

  const amount = ethers.parseUnits(withdrawAmount.toString(), 18)

  const isWithdrawEnabled = enabled && amount > 0n

  const { estimateGas } = useEstimateTxInfo({
    account: accountAddress,
    contractAddress: contracts.StakeTogether,
    functionName: 'withdrawPool',
    args: [ethers.parseUnits('0.001', 18), poolAddress],
    abi: stakeTogetherABI,
    skip: true
  })

  useEffect(() => {
    const handleMaxValue = async () => {
      const { estimatedCost } = await estimateGas()
      if (estimatedCost > 0n) {
        setEstimateGasCost(estimatedCost)
      }
    }
    handleMaxValue()
  }, [estimateGas])

  const { config } = usePrepareStakeTogetherWithdrawPool({
    address: contracts.StakeTogether,
    args: [amount, poolAddress],
    account: accountAddress,
    enabled: isWithdrawEnabled
  })

  const tx = useStakeTogetherWithdrawPool({
    ...config,
    onSuccess: data => {
      if (data?.hash) {
        setTxHash(data?.hash)
      }
    },
    onError: () => {
      setAwaitWalletAction(false)
    }
  })

  const withdrawPool = () => {
    setAwaitWalletAction(true)
    tx.write?.()
    setNotify(true)
  }

  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: txHash
  })

  const { t } = useTranslation()

  const resetState = () => {
    setAwaitWalletAction(false)
    setTxHash(undefined)
  }

  useEffect(() => {
    if (isSuccess && withdrawAmount && accountAddress) {
      apolloClient.refetchQueries({
        include: [queryAccount, queryPool, queryDelegationShares]
      })

      registerWithdraw(accountAddress, chainId, poolAddress, withdrawAmount.toString(), WithdrawType.POOL)

      if (notify) {
        notification.success({
          message: `${t('notifications.withdrawSuccess')} ${withdrawAmount} ${t('eth.symbol')}`,
          placement: 'topRight'
        })
        setNotify(false)
      }
    }
  }, [accountAddress, chainId, isSuccess, notify, poolAddress, registerWithdraw, t, withdrawAmount])

  useEffect(() => {
    if (isError) {
      if (notify) {
        notification.error({
          message: `${t('notifications.withdrawError')} ${withdrawAmount} ${t('eth.symbol')}`,
          placement: 'topRight'
        })
        setNotify(false)
      }
    }
  }, [accountAddress, isError, notify, poolAddress, t, withdrawAmount])

  return {
    withdrawPool,
    estimatedCost: estimateGasCost,
    isLoading,
    isSuccess,
    awaitWalletAction,
    resetState,
    txHash
  }
}
