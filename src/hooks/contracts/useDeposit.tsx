import { useMixpanelAnalytics } from '@/hooks/analytics/useMixpanelAnalytics'
import { queryDelegationShares } from '@/queries/queryDelegatedShares'
import { notification } from 'antd'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useWaitForTransaction } from 'wagmi'
import { apolloClient } from '../../config/apollo'
import chainConfig from '../../config/chain'
import { queryAccount } from '../../queries/queryAccount'
import { queryPool } from '../../queries/queryPool'
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

  const { estimatedCost, estimatedGasLimit, estimatedMaxFeePerGas, estimatedMaxPriorityFeePerGas } =
    useEstimateTxInfo({
      account: accountAddress,
      functionName: 'depositPool',
      args: [poolAddress, referral],
      contractAddress: contracts.StakeTogether,
      abi: stakeTogetherABI,
      value: amount,
      skip: awaitWalletAction || isSuccess || !isDepositEnabled || estimateGasCost > 0n
    })

  useEffect(() => {
    setEstimateGasCost(estimatedCost)
  }, [estimatedCost])

  const discountedGasAmount = amount - estimateGasCost

  const { config } = usePrepareStakeTogetherDepositPool({
    chainId,
    address: contracts.StakeTogether,
    args: [poolAddress, referral],
    account: accountAddress,
    enabled: isDepositEnabled,
    value: amount,
    gas: estimatedGasLimit > 0n ? estimatedGasLimit : undefined,
    maxFeePerGas: estimatedMaxFeePerGas > 0n ? estimatedMaxFeePerGas : undefined,
    maxPriorityFeePerGas: estimatedMaxPriorityFeePerGas > 0n ? estimatedMaxPriorityFeePerGas : undefined
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
    if (isSuccess && discountedGasAmount > 0n && accountAddress) {
      apolloClient.refetchQueries({
        include: [queryAccount, queryPool, queryDelegationShares]
      })
      registerDeposit(accountAddress, chainId, poolAddress, ethers.formatEther(discountedGasAmount))
      if (notify) {
        notification.success({
          message: `${t('notifications.depositSuccess')}: ${discountedGasAmount} ${t('lsd.symbol')}`,
          placement: 'topRight'
        })
        setNotify(false)
      }
    }
  }, [accountAddress, chainId, discountedGasAmount, isSuccess, notify, poolAddress, registerDeposit, t])

  useEffect(() => {
    if (isError || failedToExecute) {
      apolloClient.refetchQueries({
        include: [queryAccount, queryPool]
      })
      if (notify) {
        notification.error({
          message: `${t('notifications.depositError')}: ${discountedGasAmount} ${t('lsd.symbol')}`,
          placement: 'topRight'
        })
        setNotify(false)
      }
      setFailedToExecute(false)
    }
  }, [accountAddress, discountedGasAmount, failedToExecute, isError, notify, poolAddress, t])

  return {
    deposit,
    isLoading,
    isSuccess,
    estimatedGas: estimatedCost,
    awaitWalletAction,
    txHash,
    resetState
  }
}
