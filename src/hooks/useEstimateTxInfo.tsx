import { config } from '@/config/wagmi'
import { useCallback } from 'react'
import { estimateContractGas } from 'viem/actions'
import { useEstimateFeesPerGas } from 'wagmi'
import { getWalletClient } from 'wagmi/actions'
import { mainnet } from 'wagmi/chains'

interface UseEstimateTxInfoProps {
  chainId?: number
  account?: `0x${string}`
  contractAddress?: `0x${string}`
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abi?: any
  functionName?: string
  args?: unknown[]
  value?: bigint
  skip?: boolean
}

const useEstimateTxInfo = ({ chainId, account, contractAddress, abi, functionName, args, value, skip }: UseEstimateTxInfoProps) => {
  const { data, isLoading: gasPriceLoading } = useEstimateFeesPerGas({
    query: { enabled: !skip },
    chainId: chainId ?? mainnet.id
  })

  const gasPrice = data?.gasPrice ? data.gasPrice : 0n
  const maxFeePerGas = data?.maxFeePerGas ? data?.maxFeePerGas : 0n
  const maxPriorityFeePerGas = data?.maxPriorityFeePerGas ? data?.maxPriorityFeePerGas : 0n

  const estimateGas = useCallback(async () => {
    if (skip ?? !account ?? !contractAddress ?? !abi ?? !functionName ?? gasPriceLoading) {
      return {
        estimatedGas: 0n,
        estimatedCost: 0n,
        estimatedGasPrice: gasPriceLoading ? 0n : gasPrice,
        error: false
      }
    }

    try {
      const client = await getWalletClient(config)
      const estimatedGas = await estimateContractGas(client, {
        account,
        functionName,
        address: contractAddress,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        abi: abi,
        args: args ?? [],
        value,
        maxFeePerGas,
        maxPriorityFeePerGas
      })
      const estimatedCost = (estimatedGas * maxFeePerGas * 3n) / 2n
      return {
        estimatedGas: (estimatedGas * 3n) / 2n,
        estimatedGasPrice: gasPrice,
        // Add 50% to the estimated cost (same as metamask's market price)
        estimatedCost: (estimatedCost * 3n) / 2n,
        estimatedMaxFeePerGas: (maxFeePerGas * 3n) / 2n,
        estimatedMaxPriorityFeePerGas: (maxPriorityFeePerGas * 3n) / 2n,
        error: false
      }
    } catch {
      return {
        estimatedGas: 0n,
        estimatedCost: 0n,
        estimatedGasPrice: 0n,
        error: true
      }
    }
  }, [skip, account, contractAddress, abi, functionName, gasPriceLoading, gasPrice, args, value, maxFeePerGas, maxPriorityFeePerGas])

  return { estimateGas }
}

export default useEstimateTxInfo
