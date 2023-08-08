import { useCallback, useEffect, useState } from 'react'
import { chains } from '@/config/wagmi'
import { createPublicClient, http } from 'viem'
import { useNetworkGasPrice } from '@/hooks/useNetworkGasPrice'

interface UseEstimateTxInfoProps {
  account?: `0x${string}`
  contractAddress?: `0x${string}`
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
  const {
    networkGasPriceGwei,
    maxPriorityFeePerGas,
    maxFeePerGas,
    loading: gasPriceLoading
  } = useNetworkGasPrice()
  const [estimatedCost, setEstimatedCost] = useState(0n)
  const [estimatedGasLimit, setEstimatedGasLimit] = useState(0n)
  const [estimatedMaxFeePerGas, setEstimatedMaxFeePerGas] = useState(0n)
  const [estimatedMaxPriorityFeePerGas, setEstimatedMaxPriorityFeePerGas] = useState(0n)
  const [estimatedGasPrice, setEstimatedGasPrice] = useState(0n)
  const [loading, setLoading] = useState(false)

  const estimateGas = useCallback(async () => {
    setLoading(true)
    if (skip || !account || !contractAddress || !abi || !functionName || gasPriceLoading) {
      setLoading(false)
      return
    }
    setEstimatedGasPrice(networkGasPriceGwei)

    const client = createPublicClient({
      chain: chains[0],
      transport: http()
    })

    const estimatedGas = await client.estimateContractGas({
      account,
      functionName,
      address: contractAddress,
      abi,
      args: args || [],
      value
    })
    setEstimatedMaxPriorityFeePerGas((maxPriorityFeePerGas * 3n) / 2n)
    setEstimatedMaxFeePerGas((maxFeePerGas * 3n) / 2n)
    const estimatedCost = estimatedGas * ((maxFeePerGas * 3n) / 2n)
    setEstimatedGasLimit(estimatedGas)
    // Add 50% to the estimated cost (same as metamask's market price)
    setEstimatedCost(estimatedCost)
    setLoading(false)
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
    maxPriorityFeePerGas,
    maxFeePerGas
  ])

  useEffect(() => {
    estimateGas()
  }, [estimateGas])

  return {
    estimatedCost,
    estimatedGasLimit,
    estimatedGasPrice,
    loading,
    estimatedMaxFeePerGas,
    estimatedMaxPriorityFeePerGas
  }
}

export default useEstimateTxInfo
