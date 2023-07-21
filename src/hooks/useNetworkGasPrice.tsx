import { useEffect, useState } from 'react'
import { useFeeData } from 'wagmi'

export const useNetworkGasPrice = () => {
  const [networkGasPrice, setNetworkGasPrice] = useState('0')
  const [loading, setLoading] = useState(false)
  const { data, refetch, isLoading } = useFeeData()
  console.log('data', data)
  useEffect(() => {
    if (data?.formatted.gasPrice) {
      setNetworkGasPrice(data?.formatted.gasPrice)
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
    networkGasPrice: networkGasPrice,
    loading
  }
}
