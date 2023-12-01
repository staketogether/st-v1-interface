import { useEffect, useState } from 'react'
import { useFeeData } from 'wagmi'

export const useNetworkGasPrice = () => {
  const [networkGasPrice, setNetworkGasPrice] = useState('0')
  const [networkGasPriceGwei, setNetworkGasPriceGwei] = useState(0n)
  const [masFeePerGas, setMaxFeePerGas] = useState(0n)
  const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState(0n)
  const [loading, setLoading] = useState(false)
  const { data, isLoading } = useFeeData()

  useEffect(() => {
    if (data?.formatted.gasPrice) {
      setNetworkGasPrice(data?.formatted.gasPrice)
    }

    if (data?.gasPrice) {
      setNetworkGasPriceGwei(data?.gasPrice)
    }

    if (data?.maxFeePerGas) {
      setMaxFeePerGas(data?.maxFeePerGas)
    }

    if (data?.maxPriorityFeePerGas) {
      setMaxPriorityFeePerGas(data?.maxPriorityFeePerGas)
    }
  }, [data])

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  return {
    networkGasPrice,
    networkGasPriceGwei,
    maxPriorityFeePerGas,
    maxFeePerGas: masFeePerGas,
    loading
  }
}
