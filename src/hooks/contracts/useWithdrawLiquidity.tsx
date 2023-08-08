import { useMixpanelAnalytics } from '@/hooks/analytics/useMixpanelAnalytics'
import { queryDelegationShares } from '@/queries/queryDelegatedShares'
import { notification } from 'antd'
import { useEffect, useState } from 'react'
import { useWaitForTransaction } from 'wagmi'
import { apolloClient } from '../../config/apollo'
import chainConfig from '../../config/chain'
import { queryAccount } from '../../queries/queryAccount'
import { queryPool } from '../../queries/queryPool'

import { ethers } from 'ethers'
import {
  usePrepareStakeTogetherWithdrawLiquidity,
  useStakeTogetherWithdrawLiquidity,
  stakeTogetherABI
} from '../../types/Contracts'
import useTranslation from '../useTranslation'
import useEstimateTxInfo from '../useEstimateTxInfo'
import { WithdrawType } from '@/types/Withdraw'

export default function useWithdrawLiquidity(
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

  const { estimatedCost, estimatedGasLimit, estimatedMaxFeePerGas, estimatedMaxPriorityFeePerGas } =
    useEstimateTxInfo({
      account: accountAddress,
      contractAddress: contracts.StakeTogether,
      functionName: 'withdrawLiquidity',
      args: [amount, poolAddress],
      abi: stakeTogetherABI,
      skip: awaitWalletAction || !isWithdrawEnabled
    })

  useEffect(() => {
    setEstimateGasCost(estimatedCost)
  }, [estimatedCost])

  const { config } = usePrepareStakeTogetherWithdrawLiquidity({
    address: contracts.StakeTogether,
    args: [amount, poolAddress],
    account: accountAddress,
    enabled: isWithdrawEnabled,
    gas: estimatedGasLimit > 0n ? estimatedGasLimit : undefined,
    maxFeePerGas: estimatedMaxFeePerGas > 0n ? estimatedMaxFeePerGas : undefined,
    maxPriorityFeePerGas: estimatedMaxPriorityFeePerGas > 0n ? estimatedMaxPriorityFeePerGas : undefined
  })

  const tx = useStakeTogetherWithdrawLiquidity({
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

  const withdrawLiquidity = () => {
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

      registerWithdraw(accountAddress, chainId, poolAddress, withdrawAmount.toString(), WithdrawType.LIQUIDITY)

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
    withdrawLiquidity,
    estimatedCost: estimateGasCost,
    isLoading,
    isSuccess,
    awaitWalletAction,
    resetState,
    txHash
  }
}
