import { useEffect, useState } from 'react'
import chainConfig from '../../config/chain'
import { stakeTogetherABI } from '@/types/Contracts'
import {
  useSimulateContract,
  useWaitForTransactionReceipt as useWaitForTransaction,
  useWriteContract
} from 'wagmi'
import { notification } from 'antd'
import useLocaleTranslation from '../useLocaleTranslation'
import { getContractsByProductName } from '@/config/product'
import { getSubgraphClient } from '@/config/apollo'
import { queryAccount } from '@/queries/subgraph/queryAccount'
import { queryPools } from '@/queries/subgraph/queryPools'
import { queryStakeTogether } from '@/queries/subgraph/queryStakeTogether'

export default function useRemovePool(projectAddress: `0x${string}`, disabled?: boolean) {
  const { isTestnet, chainId } = chainConfig()
  const { StakeTogether } = getContractsByProductName({
    productName: 'ethereum-stake',
    isTestnet
  })
  const subgraphClient = getSubgraphClient({ productName: 'ethereum-stake', isTestnet })
  const [prepareTransactionErrorMessage, setPrepareTransactionErrorMessage] = useState('')
  const [awaitWalletAction, setAwaitWalletAction] = useState(false)
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
      enabled: !!disabled
    },
    chainId,
    address: StakeTogether,
    args: [projectAddress],
    abi: stakeTogetherABI,
    functionName: 'removePool'
  })

  useEffect(() => {
    if (prepareTransactionIsError && prepareTransactionError) {
      const { cause } = prepareTransactionError as { cause?: { reason?: string; message?: string } }

      if (
        (!cause || !cause.reason) &&
        cause?.message &&
        cause.message.includes(
          'The total cost (gas * gas fee + value) of executing this transaction exceeds the balance'
        )
      ) {
        setPrepareTransactionErrorMessage('insufficientGasBalance')

        return
      }
      const response = cause as { data?: { errorName?: string } }

      if (cause && response?.data && response?.data?.errorName) {
        setPrepareTransactionErrorMessage(response?.data?.errorName)
      }
    }
  }, [prepareTransactionError, prepareTransactionIsError, t])

  useEffect(() => {
    if (prepareTransactionIsSuccess) {
      setPrepareTransactionErrorMessage('')
    }
  }, [prepareTransactionIsSuccess])

  const {
    writeContract,
    data: txHash,
    isError: writeContractIsError,
    reset: resetWriteContract
  } = useWriteContract()

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
    if (awaitTransactionErrorIsError && awaitWalletAction) {
      setAwaitWalletAction(false)
      notification.error({
        message: `${t('v2.panelProject.messages.errorProjectRemove')}`,
        placement: 'topRight'
      })
    }
  }, [awaitTransactionErrorIsError, awaitWalletAction, t])

  useEffect(() => {
    if (awaitTransactionSuccess && awaitWalletAction) {
      setAwaitWalletAction(false)

      subgraphClient.refetchQueries({
        include: [queryAccount, queryPools, queryStakeTogether]
      })
      notification.success({
        message: `${t('v2.panelProject.messages.projectRemoved')}`,
        placement: 'topRight'
      })
      refetchPrepareTransaction()
    }
  }, [awaitTransactionSuccess, awaitWalletAction, refetchPrepareTransaction, subgraphClient, t])

  const removePool = () => {
    setAwaitWalletAction(true)
    writeContract(prepareTransactionData!.request)
  }

  return {
    isLoading,
    isSuccess: awaitTransactionSuccess,
    removePool,
    resetState: resetWriteContract,
    prepareTransactionIsError,
    prepareTransactionIsSuccess,
    prepareTransactionErrorMessage,
    prepareTransactionsIsLoading,
    isError: awaitTransactionErrorIsError,
    awaitWalletAction,
    txHash
  }
}
