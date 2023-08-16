import { useMixpanelAnalytics } from '@/hooks/analytics/useMixpanelAnalytics'
import { queryDelegationShares } from '@/queries/subgraph/queryDelegatedShares'
import { notification } from 'antd'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useWaitForTransaction } from 'wagmi'
import { apolloClient } from '../../config/apollo'
import chainConfig from '../../config/chain'
import { queryAccount } from '../../queries/subgraph/queryAccount'
import { queryPool } from '../../queries/subgraph/queryPool'
import {
  usePrepareStakeTogetherDepositPool,
  useStakeTogetherDepositPool,
  stakeTogetherABI
} from '../../types/Contracts'
import useEstimateTxInfo from '../useEstimateTxInfo'
import useTranslation from '../useTranslation'

export default function useDeposit(
  depositAmount: string,
  poolAddress: `0x${string}`,
  enabled: boolean,
  accountAddress?: `0x${string}`
) {
  const { contracts, chainId } = chainConfig()
  const [notify, setNotify] = useState(false)

  const [awaitWalletAction, setAwaitWalletAction] = useState(false)
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined)
  const [failedToExecute, setFailedToExecute] = useState(false)
  const { registerDeposit } = useMixpanelAnalytics()
  const [estimateGasCost, setEstimateGasCost] = useState(0n)
  const amount = ethers.parseUnits(depositAmount, 18)

  const isDepositEnabled = enabled && amount > 0n

  // Todo! Implement Referral
  const referral = '0x0000000000000000000000000000000000000000'

  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: txHash
  })

  const { estimateGas } = useEstimateTxInfo({
    account: accountAddress,
    functionName: 'depositPool',
    args: [poolAddress, referral],
    contractAddress: contracts.StakeTogether,
    abi: stakeTogetherABI,
    value: BigInt('1000000000000000'),
    skip: !isDepositEnabled || estimateGasCost > 0n
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

  const { config } = usePrepareStakeTogetherDepositPool({
    chainId,
    address: contracts.StakeTogether,
    args: [poolAddress, referral],
    account: accountAddress,
    enabled: isDepositEnabled,
    value: amount
  })

  const tx = useStakeTogetherDepositPool({
    ...config,
    onSuccess: data => {
      if (data?.hash) {
        setTxHash(data?.hash)
      }
    },
    onError: () => {
      setNotify(true)
      setFailedToExecute(true)
      setAwaitWalletAction(false)
    }
  })

  const deposit = () => {
    setAwaitWalletAction(true)
    tx.write?.()
    setNotify(true)
  }

  const { t } = useTranslation()

  const resetState = () => {
    setAwaitWalletAction(false)
    setTxHash(undefined)
  }

  useEffect(() => {
    if (isSuccess && accountAddress) {
      apolloClient.refetchQueries({
        include: [queryAccount, queryPool, queryDelegationShares]
      })
      registerDeposit(accountAddress, chainId, poolAddress, ethers.formatEther(amount))
      if (notify) {
        notification.success({
          message: `${t('notifications.depositSuccess')}: ${depositAmount} ${t('lsd.symbol')}`,
          placement: 'topRight'
        })
        setNotify(false)
      }
    }
  }, [accountAddress, amount, chainId, depositAmount, isSuccess, notify, poolAddress, registerDeposit, t])

  useEffect(() => {
    if (isError || failedToExecute) {
      apolloClient.refetchQueries({
        include: [queryAccount, queryPool]
      })
      if (notify) {
        notification.error({
          message: `${t('notifications.depositError')}: ${depositAmount} ${t('lsd.symbol')}`,
          placement: 'topRight'
        })
        setNotify(false)
      }
      setFailedToExecute(false)
    }
  }, [accountAddress, depositAmount, failedToExecute, isError, notify, poolAddress, t])

  return {
    deposit,
    isLoading,
    isSuccess,
    estimatedGas: estimateGasCost,
    awaitWalletAction,
    txHash,
    resetState
  }
}
