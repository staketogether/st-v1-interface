import { useCallback, useEffect, useState } from 'react'
import { config } from '@/config/wagmi'
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

  const estimateGas = useCallback(async () => {
    if (skip || !account || !contractAddress || !abi || !functionName || gasPriceLoading) {
      return {
        estimatedGas: 0n,
        estimatedCost: 0n,
        estimatedGasPrice: gasPriceLoading ? 0n : networkGasPriceGwei
      }
    }

    const client = config.publicClient
    const estimatedGas = await client.estimateContractGas({
      account,
      functionName,
      address: contractAddress,
      abi,
      args: args || [],
      value
    })
    const estimatedCost = estimatedGas * networkGasPriceGwei
    return {
      estimatedGas,
      estimatedGasPrice: networkGasPriceGwei,
      // Add 20% to the estimated cost
      estimatedCost: (estimatedCost * 6n) / 5n
    }
  }, [contractAddress, functionName, args, abi, account, skip, value, gasPriceLoading, networkGasPriceGwei])

  return { estimateGas }
}

export default useEstimateTxInfo
