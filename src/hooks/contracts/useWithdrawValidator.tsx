import { useMixpanelAnalytics } from '@/hooks/analytics/useMixpanelAnalytics'
import { queryDelegationShares } from '@/queries/subgraph/queryDelegatedShares'
import { notification } from 'antd'
import { useEffect, useState } from 'react'
import { useWaitForTransaction } from 'wagmi'
import { apolloClient } from '../../config/apollo'
import chainConfig from '../../config/chain'
import { queryAccount } from '../../queries/subgraph/queryAccount'
import { queryPool } from '../../queries/subgraph/queryPool'

import { WithdrawType } from '@/types/Withdraw'
import { ethers } from 'ethers'
import {
  usePrepareStakeTogetherWithdrawValidator,
  useStakeTogetherWithdrawValidator
} from '../../types/Contracts'

import useTranslation from '../useTranslation'
import { useCalculateDelegationPercentage } from '@/hooks/contracts/useCalculateDelegationPercentage'

export default function useWithdrawValidator(
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

  const { delegations } = useCalculateDelegationPercentage({
    weiAmount: ethers.parseUnits(withdrawAmount, 18),
    accountAddress,
    pools: [poolAddress],
    subtractAmount: true
  })

  const amount = ethers.parseUnits(withdrawAmount.toString(), 18)

  const isWithdrawEnabled = enabled && amount > 0n

  const { config } = usePrepareStakeTogetherWithdrawValidator({
    address: contracts.StakeTogether,
    args: [amount, delegations],
    account: accountAddress,
    enabled: isWithdrawEnabled
  })

  const tx = useStakeTogetherWithdrawValidator({
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

  const withdrawValidator = () => {
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

      registerWithdraw(accountAddress, chainId, poolAddress, withdrawAmount.toString(), WithdrawType.VALIDATOR)

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
    withdrawValidator,
    estimatedCost: 0n,
    isLoading,
    isSuccess,
    awaitWalletAction,
    resetState,
    txHash
  }
}
