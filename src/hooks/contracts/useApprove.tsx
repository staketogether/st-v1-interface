import { chainConfigByChainId } from '@/config/chain'
import { notification } from 'antd'
import { useEffect, useState } from 'react'
import { useSimulateContract, useWaitForTransactionReceipt as useWaitForTransaction, useWriteContract } from 'wagmi'
import useConnectedAccount from '../useConnectedAccount'
import useEstimateTxInfo from '../useEstimateTxInfo'
import useLocaleTranslation from '../useLocaleTranslation'
import { erc20Abi } from 'viem'
import { ethers } from 'ethers'

interface useApproveProps {
  accountAddress: `0x${string}`
  spenderAddress: `0x${string}`
  contractAddress: `0x${string}`
  chainId: number
  enabled: boolean
}

export default function useApprove({ accountAddress, spenderAddress, chainId, contractAddress, enabled }: useApproveProps) {
  const [awaitWalletAction, setAwaitWalletAction] = useState(false)
  const [prepareTransactionErrorMessage, setPrepareTransactionErrorMessage] = useState('')

  const [estimateGasCost, setEstimateGasCost] = useState(0n)
  const [maxFeePerGas, setMaxFeePerGas] = useState<bigint | undefined>(undefined)
  const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState<bigint | undefined>(undefined)
  const [depositEstimatedGas, setDepositEstimatedGas] = useState<bigint | undefined>(undefined)
  const { transactionConfig } = chainConfigByChainId(chainId)
  const { web3AuthUserInfo } = useConnectedAccount()

  const { t } = useLocaleTranslation()

  const maxUint256 = ethers.MaxUint256
  const isApproveEnabled = enabled
  const isApproveEstimatedGas = !enabled

  const { estimateGas } = useEstimateTxInfo({
    abi: erc20Abi,
    chainId: chainId,
    functionName: 'approve',
    contractAddress: contractAddress,
    args: [spenderAddress, maxUint256],
    skip: isApproveEstimatedGas && estimateGasCost > 0n
  })

  useEffect(() => {
    const handleEstimateGasPrice = async () => {
      const { estimatedCost, estimatedGas, estimatedMaxFeePerGas, estimatedMaxPriorityFeePerGas } = await estimateGas()
      setDepositEstimatedGas(estimatedGas)
      setEstimateGasCost(estimatedCost)
      setMaxFeePerGas(estimatedMaxFeePerGas)
      setMaxPriorityFeePerGas(estimatedMaxPriorityFeePerGas)
    }

    if (estimateGasCost === 0n) {
      handleEstimateGasPrice()
    }
  }, [estimateGas, estimateGasCost])

  useEffect(() => {
    if (accountAddress) {
      setDepositEstimatedGas(undefined)
      setEstimateGasCost(0n)
      setMaxFeePerGas(undefined)
      setMaxPriorityFeePerGas(undefined)
    }
  }, [accountAddress])

  const {
    data: prepareTransactionData,
    isError: prepareTransactionIsError,
    isSuccess: prepareTransactionIsSuccess,
    error: prepareTransactionError,
    isLoading: prepareTransactionsIsLoading,
    refetch: refetchPrepareTransaction
  } = useSimulateContract({
    query: {
      enabled: accountAddress && isApproveEnabled
    },
    address: contractAddress,
    abi: erc20Abi,
    chainId: chainId,
    functionName: 'approve',
    args: [spenderAddress, maxUint256],
    gas: !!depositEstimatedGas && depositEstimatedGas > 0n && !!web3AuthUserInfo ? depositEstimatedGas : undefined,
    maxFeePerGas: !!maxFeePerGas && maxFeePerGas > 0n && !!web3AuthUserInfo ? maxFeePerGas : undefined,
    maxPriorityFeePerGas: !!maxPriorityFeePerGas && maxPriorityFeePerGas > 0n && !!web3AuthUserInfo ? maxPriorityFeePerGas : undefined
  })

  useEffect(() => {
    if (prepareTransactionIsError && prepareTransactionError) {
      const { cause } = prepareTransactionError as { cause?: { reason?: string; message?: string } }

      if (
        !cause?.reason &&
        !!web3AuthUserInfo &&
        cause?.message &&
        cause.message.includes('The total cost (gas * gas fee + value) of executing this transaction exceeds the balance')
      ) {
        notification.warning({
          message: `${t('v2.stake.insufficientGasBalance')}, ${t('v2.stake.depositErrorMessage.useMaxButton')}`,
          placement: 'topRight'
        })
        setPrepareTransactionErrorMessage('insufficientGasBalance')

        return
      }
      const response = cause as { data?: { errorName?: string } }

      if (cause && response?.data?.errorName) {
        setPrepareTransactionErrorMessage(response?.data?.errorName)
      }
    }
  }, [prepareTransactionError, prepareTransactionIsError, t, web3AuthUserInfo])

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
    confirmations: transactionConfig.confirmations
  })

  useEffect(() => {
    if (awaitTransactionErrorIsError && awaitWalletAction) {
      setAwaitWalletAction(false)
      notification.error({
        message: `${t('unlockTransaction.failTransaction')}`,
        placement: 'topRight'
      })
    }
  }, [awaitTransactionErrorIsError, awaitWalletAction, t])

  useEffect(() => {
    if (awaitTransactionSuccess && awaitWalletAction) {
      setAwaitWalletAction(false)
      resetWriteContract()
      notification.success({
        message: `${t('unlockTransaction.success')}`,
        placement: 'topRight'
      })
      refetchPrepareTransaction()
    }
  }, [accountAddress, awaitTransactionSuccess, awaitWalletAction, resetWriteContract, chainId, refetchPrepareTransaction, t])

  const approve = () => {
    setAwaitWalletAction(true)
    writeContract(prepareTransactionData!.request)
  }

  return {
    approve,
    isLoading,
    isSuccess: awaitTransactionSuccess,
    estimatedGas: estimateGasCost,
    awaitWalletAction,
    txHash,
    resetState: resetWriteContract,
    prepareTransactionIsError,
    prepareTransactionIsSuccess,
    prepareTransactionErrorMessage,
    prepareTransactionsIsLoading
  }
}
