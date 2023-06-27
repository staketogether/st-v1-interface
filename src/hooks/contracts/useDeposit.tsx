import { useMixpanelAnalytics } from '@/hooks/analytics/useMixpanelAnalytics'
import { queryDelegationShares } from '@/queries/queryDelegatedShares'
import { notification } from 'antd'
import { useEffect, useState } from 'react'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { apolloClient } from '../../config/apollo'
import chainConfig from '../../config/chain'
import { queryAccount } from '../../queries/queryAccount'
import { queryPool } from '../../queries/queryPool'
import { stakeTogetherABI } from '../../types/Contracts'
import useTranslation from '../useTranslation'

export default function useDeposit(
  depositAmount: bigint,
  accountAddress: `0x${string}`,
  poolAddress: `0x${string}`
) {
  const { contracts, chainId } = chainConfig()
  const [notify, setNotify] = useState(false)

  const [awaitWalletAction, setAwaitWalletAction] = useState(false)
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined)
  const { registerDeposit } = useMixpanelAnalytics()

  const depositRule = depositAmount > 0n

  // Todo! Implement Referral
  const referral = '0x0000000000000000000000000000000000000000'

  const { config } = usePrepareContractWrite({
    address: contracts.StakeTogether,
    abi: stakeTogetherABI,
    functionName: 'depositPool',
    args: [poolAddress, referral],
    account: accountAddress,
    gas: 300000n,
    enabled: !depositRule,
    value: depositAmount
  })

  console.log('GAS ESTIMATE', config)

  const tx = useContractWrite({
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
    estimateGas: '0',
    awaitWalletAction,
    txHash,
    resetState
  }
}
