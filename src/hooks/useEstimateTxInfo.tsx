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
  const { networkGasPriceGwei, loading: gasPriceLoading } = useNetworkGasPrice()
  const [estimatedCost, setEstimatedCost] = useState(0n)
  const [estimatedGas, setEstimatedGas] = useState(0n)
  const [estimatedGasPrice, setEstimatedGasPrice] = useState(0n)
  const [loading, setLoading] = useState(false)

  const estimateGas = useCallback(async () => {
    setLoading(true)
    if (skip || !account || !contractAddress || !abi || !functionName || gasPriceLoading) {
      setEstimatedCost(0n)
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
    setEstimatedGas(estimatedGas)
    const estimatedCost = estimatedGas * networkGasPriceGwei
    // Add 20% to the estimated cost
    setEstimatedCost((estimatedCost * 6n) / 5n)
    setLoading(false)
  }, [contractAddress, functionName, args, abi, account, skip, value, gasPriceLoading, networkGasPriceGwei])

  useEffect(() => {
    estimateGas()
  }, [estimateGas])

  return { estimatedCost, estimatedGas, estimatedGasPrice, loading }
}

export default useEstimateTxInfo
