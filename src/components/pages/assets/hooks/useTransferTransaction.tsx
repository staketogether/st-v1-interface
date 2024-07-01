import { useSimulateContract, useWaitForTransactionReceipt as useWaitForTransaction, useWriteContract } from 'wagmi'
import { chainConfigByChainId } from '@/config/chain'
import { useCallback, useEffect, useState } from 'react'
import useEstimateTxInfo from '@/hooks/useEstimateTxInfo'
import { Asset } from '@/types/Asset'
import { ethers } from 'ethers'
import { erc20Abi } from 'viem'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { notification } from 'antd'
import { stBackendClient } from '@/config/apollo'
import { queryAccountAssets } from '@/queries/subgraph/queryAccountAssets'
import useConnectedAccount from '@/hooks/useConnectedAccount'

interface useAssetSendTransactionProps {
  chainId: number
  asset: Asset
  sendAmountValue: string
}

export default function useTransferTransaction({ chainId, asset, sendAmountValue }: useAssetSendTransactionProps) {
  const [awaitWalletAction, setAwaitWalletAction] = useState(false)
  const [estimateGasCost, setEstimateGasCost] = useState(0n)
  const [maxFeePerGas, setMaxFeePerGas] = useState<bigint | undefined>(undefined)
  const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState<bigint | undefined>(undefined)
  const [sendTransactionEstimatedGas, setSendTransactionEstimatedGas] = useState<bigint | undefined>(undefined)
  const [prepareTransactionErrorMessage, setPrepareTransactionErrorMessage] = useState('')
  const contractAddress = asset?.networks.find(network => network.chainId === chainId)?.contractAddress
  const simulateAmount = ethers.parseUnits('0.0000001', asset?.decimals)
  const { transactionConfig } = chainConfigByChainId(chainId)
  const { account, web3AuthUserInfo } = useConnectedAccount()

  const { t } = useLocaleTranslation()

  const { estimateGas } = useEstimateTxInfo({
    account: account,
    functionName: 'transfer',
    contractAddress: contractAddress ?? '0x',
    args: [account, simulateAmount],
    abi: erc20Abi,
    chainId
  })
  useEffect(() => {
    const handleEstimateGasPrice = async () => {
      const { estimatedCost, estimatedGas, estimatedMaxFeePerGas, estimatedMaxPriorityFeePerGas } = await estimateGas()
      setSendTransactionEstimatedGas(estimatedGas)
      setEstimateGasCost(estimatedCost)
      setMaxFeePerGas(estimatedMaxFeePerGas)
      setMaxPriorityFeePerGas(estimatedMaxPriorityFeePerGas)
    }
    if (estimateGasCost === 0n) {
      handleEstimateGasPrice()
    }
  }, [estimateGas, estimateGasCost])

  const {
    isError: prepareTransactionIsError,
    error: prepareTransactionError,
    isSuccess: prepareTransactionIsSuccess,
    data: prepareTransferTransactionData
  } = useSimulateContract({
    functionName: 'transfer',
    address: contractAddress ?? '0x',
    args: [account ?? '0x', ethers.parseUnits(sendAmountValue, asset?.decimals)],
    abi: erc20Abi,
    chainId: chainId,
    gas: !!sendTransactionEstimatedGas && sendTransactionEstimatedGas > 0n && web3AuthUserInfo ? sendTransactionEstimatedGas : undefined,
    maxFeePerGas: !!maxFeePerGas && maxFeePerGas > 0n && web3AuthUserInfo ? maxFeePerGas : undefined,
    maxPriorityFeePerGas: !!maxPriorityFeePerGas && maxPriorityFeePerGas > 0n && web3AuthUserInfo ? maxPriorityFeePerGas : undefined
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

  const { writeContract, data: txHash, reset: resetWriteContract, isError: writeContractIsError } = useWriteContract()

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
        message: `${t('genericErrorMessage')}`,
        placement: 'topRight'
      })
    }
  }, [awaitTransactionErrorIsError, awaitWalletAction, t])

  useEffect(() => {
    if (awaitTransactionSuccess && awaitWalletAction) {
      setAwaitWalletAction(false)

      stBackendClient.refetchQueries({
        include: [queryAccountAssets]
      })

      resetWriteContract()
    }
  }, [awaitTransactionSuccess, awaitWalletAction, resetWriteContract])

  const sendTransfer = useCallback(() => {
    setAwaitWalletAction(true)
    writeContract(prepareTransferTransactionData!.request)
  }, [prepareTransferTransactionData, writeContract])

  return {
    awaitWalletAction,
    isLoading,
    isSuccess: awaitTransactionSuccess,
    isError: awaitTransactionErrorIsError,
    sendTransfer,
    sendTransactionEstimatedGas: sendTransactionEstimatedGas ?? 0n,
    prepareTransactionIsError,
    prepareTransactionIsSuccess,
    prepareTransactionErrorMessage
  }
}
