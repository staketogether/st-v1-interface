import { useMixpanelAnalytics } from '@/hooks/analytics/useMixpanelAnalytics'
import { queryAccountActivities } from '@/queries/subgraph/queryAccountActivities'
import { queryAccountDelegations } from '@/queries/subgraph/queryAccountDelegations'
import { queryAccountRewards } from '@/queries/subgraph/queryAccountRewards'
import { queryDelegationShares } from '@/queries/subgraph/queryDelegatedShares'
import { queryPoolActivities } from '@/queries/subgraph/queryPoolActivities'
import { queryPools } from '@/queries/subgraph/queryPools'
import { queryPoolsMarketShare } from '@/queries/subgraph/queryPoolsMarketShare'
import { queryStakeTogether } from '@/queries/subgraph/queryStakeTogether'
import { WithdrawType } from '@/types/Withdraw'
import { notification } from 'antd'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useWaitForTransaction } from 'wagmi'
import { apolloClient } from '../../config/apollo'
import chainConfig from '../../config/chain'
import { queryAccount } from '../../queries/subgraph/queryAccount'
import { queryPool } from '../../queries/subgraph/queryPool'
import {
  stakeTogetherABI,
  usePrepareStakeTogetherWithdrawPool,
  useStakeTogetherWithdrawPool
} from '../../types/Contracts'
import useEstimateTxInfo from '../useEstimateTxInfo'
import useLocaleTranslation from '../useLocaleTranslation'
import useActiveChain from "@/hooks/useActiveChain";

export default function useWithdrawPool(
  withdrawAmount: string,
  poolAddress: `0x${string}`,
  enabled: boolean,
  accountAddress?: `0x${string}`
) {
  const [estimateGasCost, setEstimateGasCost] = useState(0n)
  const [notify, setNotify] = useState(false)
  const [awaitWalletAction, setAwaitWalletAction] = useState(false)
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined)
  const [prepareTransactionErrorMessage, setPrepareTransactionErrorMessage] = useState('')
  const { config: chain } = useActiveChain()
  const { contracts, chainId } = chain

  const { registerWithdraw } = useMixpanelAnalytics()
  const amountEstimatedGas = ethers.parseUnits('0.001', 18)
  const amount = ethers.parseUnits(withdrawAmount.toString(), 18)
  const isWithdrawEnabled = enabled && amount > 0n

  const { estimateGas } = useEstimateTxInfo({
    account: accountAddress,
    contractAddress: contracts.StakeTogether,
    functionName: 'withdrawPool',
    args: [amountEstimatedGas],
    abi: stakeTogetherABI,
    skip: !enabled || estimateGasCost > 0n
  })

  useEffect(() => {
    const handleEstimateGas = async () => {
      const { estimatedCost } = await estimateGas()
      if (estimatedCost > 0n) {
        setEstimateGasCost(estimatedCost)
      }
    }
    handleEstimateGas()
  }, [estimateGas])

  const {
    config,
    isError: prepareTransactionIsError,
    isSuccess: prepareTransactionIsSuccess
  } = usePrepareStakeTogetherWithdrawPool({
    address: contracts.StakeTogether,
    args: [amount, poolAddress],
    account: accountAddress,
    enabled: isWithdrawEnabled,
    onError(error) {
      const { cause } = error as { cause?: { reason?: string } }
      const { data } = cause as { data?: { errorName?: string } }

      if (cause && data && data.errorName) {
        setPrepareTransactionErrorMessage(data.errorName)
      }
    },
    onSuccess() {
      setPrepareTransactionErrorMessage('')
    }
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
    hash: txHash,
    confirmations: 2
  })

  const { t } = useLocaleTranslation()

  const resetState = () => {
    setAwaitWalletAction(false)
    setTxHash(undefined)
  }

  useEffect(() => {
    if (isSuccess && withdrawAmount && accountAddress) {
      apolloClient.refetchQueries({
        include: [
          queryAccount,
          queryPool,
          queryDelegationShares,
          queryAccountActivities,
          queryAccountDelegations,
          queryAccountRewards,
          queryPoolActivities,
          queryPools,
          queryPoolsMarketShare,
          queryStakeTogether
        ]
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
  }, [accountAddress, chainId, notify, isSuccess, poolAddress, registerWithdraw, t, withdrawAmount])

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
    txHash,
    prepareTransactionIsError,
    prepareTransactionIsSuccess,
    prepareTransactionErrorMessage
  }
}
