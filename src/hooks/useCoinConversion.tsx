import { useReactiveVar } from '@apollo/client/react/hooks/useReactiveVar'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { usdPriceVar } from './useGetCurrencyPrice'

export default function useCoinConversion(amountValue: string) {
  const [coinPrice, setCoinPrice] = useState<string | undefined>('0')
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  const currency = router.query.currency
  const usdPrice = useReactiveVar(usdPriceVar)

  const symbol = () => {
    switch (currency) {
      case 'brl':
        return 'R$'
      case 'usd':
        return '$'
      case 'eur':
        return '€'
      default:
        return '$'
    }
  }

  useEffect(() => {
    if (usdPrice && amountValue) {
      const priceCalc = Number(amountValue) * usdPrice
      setCoinPrice(priceCalc.toString())
      setLoading(false)
      return
    }
    setCoinPrice('0')
  }, [amountValue, usdPrice])

  return { price: coinPrice, loading, settingCurrency: currency, symbol }
}
