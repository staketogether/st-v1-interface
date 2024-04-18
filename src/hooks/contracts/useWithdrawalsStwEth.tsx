import { ethereumMainnetClient } from '@/config/apollo'
import { getAssetContractsById } from '@/config/asset'
import { queryAccountActivities } from '@/queries/subgraph/queryAccountActivities'
import { queryAccountDelegations } from '@/queries/subgraph/queryAccountDelegations'
import { queryAccountRewards } from '@/queries/subgraph/queryAccountRewards'
import { queryDelegationShares } from '@/queries/subgraph/queryDelegatedShares'
import { queryPoolActivities } from '@/queries/subgraph/queryPoolActivities'
import { queryPools } from '@/queries/subgraph/queryPools'
import { queryPoolsMarketShare } from '@/queries/subgraph/queryPoolsMarketShare'
import { queryStakeTogether } from '@/queries/subgraph/queryStakeTogether'
import { withdrawalsAbi } from '@/types/Contracts'
import { notification } from 'antd'
import { useEffect, useState } from 'react'
import { useSimulateContract, useWaitForTransactionReceipt as useWaitForTransaction, useWriteContract } from 'wagmi'
import chainConfig from '../../config/chain'
import { queryAccount } from '../../queries/subgraph/queryAccount'
import { queryPool } from '../../queries/subgraph/queryPool'
import useLocaleTranslation from '../useLocaleTranslation'

export default function useWithdrawalsStwEth(withdrawAmount: bigint, accountAddress: `0x${string}`, enabled: boolean) {
  const { chainId, isTestnet } = chainConfig()

  const { Withdrawals } = getAssetContractsById('eth-staking', isTestnet)
  const [awaitWalletAction, setAwaitWalletAction] = useState(false)
  const [prepareTransactionErrorMessage, setPrepareTransactionErrorMessage] = useState('')
  const isWithdrawEnabled = enabled && withdrawAmount > 0n
  const { t } = useLocaleTranslation()

  const {
    data: prepareTransactionData,
    isError: prepareTransactionIsError,
    isSuccess: prepareTransactionIsSuccess,
    error: prepareTransactionError,
    isLoading: prepareTransactionsIsLoading,
    refetch: refetchPrepareTransaction
  } = useSimulateContract({
    query: {
      enabled: isWithdrawEnabled
    },
    address: Withdrawals,
    args: [withdrawAmount],
    abi: withdrawalsAbi,
    account: accountAddress,
    functionName: 'withdraw'
  })

  useEffect(() => {
    if (prepareTransactionIsError && prepareTransactionError) {
      const { cause } = prepareTransactionError as { cause?: { reason?: string; message?: string } }

      if (
        !cause?.reason &&
        cause?.message &&
        cause.message.includes('The total cost (gas * gas fee + value) of executing this transaction exceeds the balance')
      ) {
        setPrepareTransactionErrorMessage('insufficientGasBalance')

        return
      }
      const response = cause as { data?: { errorName?: string } }

      if (cause && response?.data?.errorName) {
        setPrepareTransactionErrorMessage(response?.data?.errorName)
      }
    }
  }, [prepareTransactionError, prepareTransactionIsError, t])

  useEffect(() => {
    if (prepareTransactionIsSuccess) {
      setPrepareTransactionErrorMessage('')
    }
  }, [prepareTransactionIsSuccess])

  const { writeContract, data: txHash, isError: writeContractIsError, reset: resetWriteContract } = useWriteContract()

  useEffect(() => {
    if (writeContractIsError && awaitWalletAction) {
      notification.error({
        message: `${t('v2.stake.userRejectedTheRequest')}`,
        placement: 'topRight'
      })
      setAwaitWalletAction(false)
    }
  }, [awaitWalletAction, t, writeContractIsError])

  const {
    isLoading,
    isSuccess: awaitTransactionSuccess,
    isError: awaitTransactionErrorIsError
  } = useWaitForTransaction({
    hash: txHash,
    confirmations: 2
  })

  useEffect(() => {
    if (awaitTransactionSuccess && withdrawAmount && accountAddress) {
      ethereumMainnetClient.refetchQueries({
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

      notification.success({
        message: `${t('notifications.withdrawSuccess')} ${withdrawAmount} ${t('eth.symbol')}`,
        placement: 'topRight'
      })

      refetchPrepareTransaction()
    }
  }, [accountAddress, awaitTransactionSuccess, chainId, refetchPrepareTransaction, t, withdrawAmount])

  useEffect(() => {
    if (awaitTransactionErrorIsError) {
      notification.error({
        message: `${t('notifications.withdrawError')} ${withdrawAmount} ${t('eth.symbol')}`,
        placement: 'topRight'
      })
    }
  }, [accountAddress, awaitTransactionErrorIsError, t, withdrawAmount])

  const withdrawalsWithdraw = () => {
    setAwaitWalletAction(true)
    writeContract(prepareTransactionData!.request)
  }

  return {
    withdrawalsWithdraw,
    estimatedCost: 0n,
    isLoading,
    isSuccess: awaitTransactionSuccess,
    awaitWalletAction,
    prepareTransactionIsError,
    prepareTransactionIsSuccess,
    prepareTransactionErrorMessage,
    prepareTransactionsIsLoading,
    resetState: resetWriteContract,
    txHash
  }
}
