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
import { usePrepareStakeTogetherDepositPool, useStakeTogetherDepositPool } from '../../types/Contracts'
import useTranslation from '../useTranslation'
import useEstimateGas from '../useEstimateGas'

export default function useDeposit(
  depositAmount: string,
  accountAddress: `0x${string}`,
  poolAddress: `0x${string}`,
  enabled: boolean,
  options?: {
    gas?: bigint
    gasPrice?: bigint,
    maxFeePerGas?: bigint,
    maxPriorityFeePerGas?: bigint
  }
) {
  const { contracts, chainId } = chainConfig()
  const [notify, setNotify] = useState(false)

  const [awaitWalletAction, setAwaitWalletAction] = useState(false)
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined)
  const { registerDeposit } = useMixpanelAnalytics()

  const amount = ethers.parseUnits(depositAmount, 18)

  const depositRule = enabled && amount > 0n

  // Todo! Implement Referral
  const referral = '0x0000000000000000000000000000000000000000'

  const { config } = usePrepareStakeTogetherDepositPool({
    address: contracts.StakeTogether,
    args: [poolAddress, referral],
    account: accountAddress,
    gas: options?.gas || 300000n,
    maxFeePerGas: options?.maxFeePerGas,
    maxPriorityFeePerGas: options?.maxPriorityFeePerGas,
    enabled: depositRule,
    value: amount
  })

  const tx = useStakeTogetherDepositPool({
    ...config,
    onSuccess: data => {
      if (data?.hash) {
        setTxHash(data?.hash)
      }
    },
    onError: (error: any) => {
      console.log(error)
      setAwaitWalletAction(false)
    }
  })

  const deposit = () => {
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
    if (isSuccess && depositAmount) {
      apolloClient.refetchQueries({
        include: [queryAccount, queryPool, queryDelegationShares]
      })
      registerDeposit(accountAddress, chainId, poolAddress, depositAmount.toString())
      if (notify) {
        notification.success({
          message: `${t('notifications.depositSuccess')}: ${depositAmount} ${t('lsd.symbol')}`,
          placement: 'topRight'
        })
        setNotify(false)
      }
    }
  }, [accountAddress, chainId, depositAmount, isSuccess, notify, poolAddress, registerDeposit, t])

  useEffect(() => {
    if (isError) {
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
    }
  }, [accountAddress, depositAmount, isError, notify, poolAddress, t])

  return {
    deposit,
    isLoading,
    isSuccess,
    estimateGas: options?.gas && options?.maxFeePerGas ? options?.gas * options?.maxFeePerGas : 0n,
    awaitWalletAction,
    txHash,
    resetState
  }
}
