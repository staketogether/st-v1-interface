import { useReactiveVar } from '@apollo/client/react/hooks/useReactiveVar'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { currencyPriceVar } from './useGetCurrencyPrice'

export default function useCoinConversion(amountValue: string) {
  const [coinPrice, setCoinPrice] = useState<string | undefined>('0')
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  const currency = router.query.currency
  const currencyPrice = useReactiveVar(currencyPriceVar)

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
    const normalizedAmount = amountValue.replace(',', '.')
    const amount = Number(normalizedAmount)

    if (!isNaN(amount) && !isNaN(currencyPrice)) {
      const priceCalc = amount * currencyPrice
      setCoinPrice(priceCalc.toString())
      setLoading(false)
    } else {
      setCoinPrice('0')
      setLoading(false)
    }
  }, [amountValue, currencyPrice])

  return { price: coinPrice, loading, settingCurrency: currency, symbol }
}
