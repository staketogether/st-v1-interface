import { useCallback, useEffect, useState } from 'react'
import { config } from '@/config/wagmi'
import { createPublicClient, http } from 'viem'
import { useNetworkGasPrice } from '@/hooks/useNetworkGasPrice'
import { ethers } from "ethers";

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
  const { networkGasPriceGwei, maxPriorityFeePerGas, maxFeePerGas, loading: gasPriceLoading } = useNetworkGasPrice()

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
    const estimatedCost = estimatedGas * maxFeePerGas
    return {
      estimatedGas: estimatedGas,
      estimatedGasPrice: networkGasPriceGwei,
      // Add 20% to the estimated cost
      estimatedCost: (estimatedCost * 6n) / 5n,
      estimatedMaxFeePerGas: maxFeePerGas * 6n / 5n,
      estimatedMaxPriorityFeePerGas: maxPriorityFeePerGas
    }
  }, [skip, account, contractAddress, abi, functionName, gasPriceLoading, args, value, networkGasPriceGwei, maxPriorityFeePerGas, maxFeePerGas])

  return { estimateGas }
}

export default useEstimateTxInfo
