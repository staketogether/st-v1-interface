import { useMixpanelAnalytics } from '@/hooks/analytics/useMixpanelAnalytics'
import { queryDelegationShares } from '@/queries/queryDelegatedShares'
import { truncateWei } from '@/services/truncate'
import { notification } from 'antd'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useWaitForTransaction } from 'wagmi'
import { apolloClient } from '../../config/apollo'
import chainConfig from '../../config/chain'
import { queryAccount } from '../../queries/queryAccount'
import { queryPool } from '../../queries/queryPool'
import { usePrepareStakeTogetherDepositPool, useStakeTogetherDepositPool } from '../../types/Contracts'
import useAccountDelegations from '../useAccountDelegations'
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

  const { delegations } = useAccountDelegations(
    poolAddress,
    ethers.parseEther(depositAmount || '0'),
    'deposit',
    accountAddress
  )

  const amount = ethers.parseUnits(depositAmount, 18)

  const isDepositEnabled = enabled && amount > 0n

  // Todo! Implement Referral
  const referral = '0x0000000000000000000000000000000000000000'

  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: txHash
  })

  const discountedGasAmount = amount - ethers.parseEther('0.001')

  const { config } = usePrepareStakeTogetherDepositPool({
    chainId,
    address: contracts.StakeTogether,
    args: [delegations, referral],
    account: accountAddress,
    enabled: accountAddress && isDepositEnabled,
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
    if (isSuccess && discountedGasAmount > 0n && accountAddress) {
      apolloClient.refetchQueries({
        include: [queryAccount, queryPool, queryDelegationShares]
      })
      registerDeposit(accountAddress, chainId, poolAddress, ethers.formatEther(discountedGasAmount))
      if (notify) {
        notification.success({
          message: `${t('notifications.depositSuccess')}: ${truncateWei(discountedGasAmount, 6)} ${t(
            'lsd.symbol'
          )}`,
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
          message: `${t('notifications.depositError')}: ${truncateWei(discountedGasAmount, 6)} ${t(
            'lsd.symbol'
          )}`,
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
    estimatedGas: 0n,
    awaitWalletAction,
    txHash,
    resetState
  }
}
