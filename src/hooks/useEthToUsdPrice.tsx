import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useEthToUsdPrice(amountValue: string) {
  const [price, setPrice] = useState<string | undefined>('0')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<unknown>(null)
  const [usdPrice, setUsdPRice] = useState(0)
  useEffect(() => {
    const fetchPrice = async () => {
      const config = {
        params: {
          refreshInterval: 60 * 1000 * 5, // 5m Interval
          revalidateOnFocus: false,
          refreshWhenHidden: false
        }
      }
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&symbols=eth`
      try {
        const data = await axios.get(url, config)
        const response = data as { data: [{ current_price: number }] }
        if (response && response.data[0] && response.data[0].current_price) {
          setUsdPRice(response.data[0].current_price)
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching ETH to USD price:', error)
        setError(error)
        setLoading(false)
      }
    }
    fetchPrice()
  }, [])

  useEffect(() => {
    if (usdPrice && amountValue) {
      const priceCalc = Number(amountValue) * usdPrice
      setPrice(priceCalc.toString())
      return
    }
    setPrice('0')
  }, [amountValue, usdPrice])

  return { price, loading, error }
}
