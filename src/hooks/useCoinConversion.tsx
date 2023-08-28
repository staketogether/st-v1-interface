import axios from 'axios'
import { useEffect, useState } from 'react'
import useSettingsCurrency from './useSettingCurrency'

export default function useCoinConversion(amountValue: string) {
  const [coinPrice, setCoinPrice] = useState<string | undefined>('0')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<unknown>(null)
  const [conversionPrice, setConversionPrice] = useState(0)
  const { currency } = useSettingsCurrency()
  useEffect(() => {
    const fetchPrice = async () => {
      const config = {
        params: {
          refreshInterval: 60 * 1000 * 5, // 5m Interval
          revalidateOnFocus: false,
          refreshWhenHidden: false
        }
      }
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.value}&symbols=eth`
      try {
        const data = await axios.get(url, config)
        const response = data as { data: [{ current_price: number }] }
        if (response && response.data[0] && response.data[0].current_price) {
          setConversionPrice(response.data[0].current_price)
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching ETH to USD price:', error)
        setError(error)
        setLoading(false)
      }
    }
    fetchPrice()
  }, [currency.value])

  useEffect(() => {
    if (conversionPrice && amountValue) {
      const priceCalc = Number(amountValue) * conversionPrice
      setCoinPrice(priceCalc.toString())
      return
    }
    setCoinPrice('0')
  }, [amountValue, conversionPrice])

  return { price: coinPrice, loading, error, settingCurrency: currency }
}
