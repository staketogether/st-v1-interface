import { config } from '@/config/wagmi'
import { useCallback } from 'react'
import { useFeeData } from 'wagmi'

interface UseEstimateTxInfoProps {
  account?: `0x${string}`
  contractAddress?: `0x${string}`
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abi?: any
  functionName?: string
  args?: unknown[]
  value?: bigint
  skip?: boolean
}

const useEstimateTxInfo = ({
  account,
  contractAddress,
  abi,
  functionName,
  args,
  value,
  skip
}: UseEstimateTxInfoProps) => {
  const { data, isLoading: gasPriceLoading } = useFeeData({ enabled: !skip })

  const networkGasPriceGwei = data && data.gasPrice ? data.gasPrice : 0n
  const maxFeePerGas = data && data.maxFeePerGas ? data?.maxFeePerGas : 0n
  const maxPriorityFeePerGas = data && data.maxPriorityFeePerGas ? data?.maxPriorityFeePerGas : 0n

  const estimateGas = useCallback(async () => {
    if (skip || !account || !contractAddress || !abi || !functionName || gasPriceLoading) {
      return {
        estimatedGas: 0n,
        estimatedCost: 0n,
        estimatedGasPrice: gasPriceLoading ? 0n : networkGasPriceGwei,
        error: false
      }
    }

    const client = config.publicClient
    try {
      const estimatedGas = await client.estimateContractGas({
        account,
        functionName,
        address: contractAddress,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        abi: abi as any,
        args: args || [],
        value
      })
      const estimatedCost = (estimatedGas * maxFeePerGas * 3n) / 2n
      return {
        estimatedGas: (estimatedGas * 3n) / 2n,
        estimatedGasPrice: networkGasPriceGwei,
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
  }, [
    skip,
    account,
    contractAddress,
    abi,
    functionName,
    gasPriceLoading,
    networkGasPriceGwei,
    args,
    value,
    maxFeePerGas,
    maxPriorityFeePerGas
  ])

  return { estimateGas }
}

export default useEstimateTxInfo
