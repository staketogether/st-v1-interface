import { useEffect, useState } from 'react'
import { chains } from "@/config/wagmi";
import { createPublicClient, http } from "viem";
import { useNetworkGasPrice } from "@/hooks/useNetworkGasPrice";

export default function useEstimateTxInfo(
  params: {
    account?: `0x${string}`,
    contractAddress?: `0x${string}`,
    abi?: any,
    functionName?: string,
    args?: unknown[],
    value?: bigint
  },
  skip?: boolean
) {
  const { account, contractAddress, abi, functionName, args, value } = params
  const { networkGasPriceGwei, loading: gasPriceLoading } = useNetworkGasPrice()
  const [estimatedCost, setEstimatedCost] = useState(0n)
  const [estimatedGas, setEstimatedGas] = useState(0n)
  const [estimatedGasPrice, setEstimatedGasPrice] = useState(0n)
  useEffect(() => {
    const estimateGas = async () => {
      if (skip || !account || !contractAddress || !abi || !functionName || gasPriceLoading) {
        setEstimatedCost(0n)
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
      setEstimatedCost(estimatedCost * 6n / 5n)
    }

    estimateGas()
  }, [contractAddress, functionName, args, abi, account, skip, value, gasPriceLoading, networkGasPriceGwei])
  return { estimatedCost, estimatedGas, estimatedGasPrice }
}
