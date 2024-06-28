import { useSendTransaction as useSend, useWaitForTransactionReceipt as useWaitForTransaction } from 'wagmi'
import { chainConfigByChainId } from '@/config/chain'

interface useAssetSendTransactionProps {
  chainId: number
}

export default function useAssetSendTransaction({ chainId }: useAssetSendTransactionProps) {
  const { transactionConfig } = chainConfigByChainId(chainId)
  const { data: txHash, sendTransaction, isPending } = useSend()

  const {
    isLoading,
    isSuccess: awaitTransactionSuccess,
    isError: awaitTransactionErrorIsError
  } = useWaitForTransaction({
    hash: txHash,
    confirmations: transactionConfig.confirmations
  })

  return { sendTransaction, isLoading: isLoading || isPending, isSuccess: awaitTransactionSuccess, isError: awaitTransactionErrorIsError }
}
