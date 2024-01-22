import { makeVar, useReactiveVar } from '@apollo/client'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const usdPriceVar = makeVar(0)

export default function useGetCurrencyPrice() {
  const router = useRouter()
  const currency = router.query.currency
  const usdPrice = useReactiveVar(usdPriceVar)

  useEffect(() => {
    const fetchPrice = async () => {
      const config = {
        params: {
          refreshInterval: 60 * 1000 * 5, // 5m Interval
          revalidateOnFocus: false,
          refreshWhenHidden: false
        }
      }
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&symbols=eth`
      try {
        const data = await axios.get(url, config)
        const response = data as { data: [{ current_price: number }] }
        if (response && response.data[0] && response.data[0].current_price) {
          usdPriceVar(response.data[0].current_price)
        }
      } catch (error) {
        console.error('Error fetching ETH to USD price:', error)
      }
    }
    if (!usdPrice) fetchPrice()
  }, [currency, usdPrice])
}
