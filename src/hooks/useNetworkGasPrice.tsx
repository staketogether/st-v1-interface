import { useEffect, useState } from 'react'
import { useFeeData } from 'wagmi'

export const useNetworkGasPrice = () => {
  const [networkGasPrice, setNetworkGasPrice] = useState('0')
  const [networkGasPriceGwei, setNetworkGasPriceGwei] = useState(0n)
  const [loading, setLoading] = useState(false)
  const { data, refetch, isLoading } = useFeeData()

  useEffect(() => {
    if (data?.formatted.gasPrice) {
      setNetworkGasPrice(data?.formatted.gasPrice)
    }

    if (data?.gasPrice) {
      setNetworkGasPriceGwei(data?.gasPrice)
    }
  }, [data])

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  useEffect(() => {
    const milliseconds = 1000
    const timer = setInterval(() => {
      refetch()
    }, 30 * milliseconds)
    return () => {
      clearInterval(timer)
    }
  }, [refetch])

  return {
    networkGasPrice,
    networkGasPriceGwei,
    loading
  }
}
