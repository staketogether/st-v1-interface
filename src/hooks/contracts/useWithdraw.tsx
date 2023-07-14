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
import { usePrepareStakeTogetherWithdrawPool, useStakeTogetherWithdrawPool } from '../../types/Contracts'
import useTranslation from '../useTranslation'
import useEstimateGas from '../useEstimateGas'

export default function useWithdraw(
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

  const amount = ethers.parseUnits(withdrawAmount.toString(), 18)

  const withdrawRule = enabled && amount > 0n

  const { config } = usePrepareStakeTogetherWithdrawPool({
    address: contracts.StakeTogether,
    args: [amount, poolAddress],
    account: accountAddress,
    gas: 300000n,
    enabled: withdrawRule
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

  const { estimateGas } = useEstimateGas(tx as ethers.TransactionRequest)

  const withdraw = () => {
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
    if (isSuccess && withdrawAmount) {
      apolloClient.refetchQueries({
        include: [queryAccount, queryPool, queryDelegationShares]
      })
      registerWithdraw(accountAddress, chainId, poolAddress, withdrawAmount.toString())
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

  return { withdraw, estimateGas, isLoading, isSuccess, awaitWalletAction, resetState, txHash }
}
