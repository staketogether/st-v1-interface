import { useReactiveVar } from '@apollo/client/react/hooks/useReactiveVar'
import currency from 'currency.js'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { userCurrencyFromUsdVar } from './useGetUsdConversionRatesPrice'

const currencySymbols = {
  USD: '$', // US Dollar
  BRL: 'R$', // Brazilian Real
  EUR: '€' // Euro
}

export default function useCoinUsdToUserCurrency() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const currencyCode = router.query.currency as string

  const userCurrencyFromUsd = useReactiveVar(userCurrencyFromUsdVar)

  const handleQuotePrice = useCallback(
    (amount: number) => {
      const rate = userCurrencyFromUsd?.[currencyCode.toUpperCase()]
      const symbol = currencySymbols[currencyCode.toUpperCase() as keyof typeof currencySymbols] || '$'
      if (!isNaN(amount) && rate && !isNaN(rate)) {
        // Use currency.js to multiply and initially format the amount
        let result = currency(amount, { symbol: '$', precision: 2 }).multiply(rate).format()

        // Replace the generic dollar symbol with the specific currency symbol
        result = result.replace('$', `${symbol} `)

        return result
      } else {
        return 'N/A'
      }
    },
    [userCurrencyFromUsd, currencyCode]
  )

  useEffect(() => {
    if (userCurrencyFromUsd) {
      setLoading(false)
    }
  }, [userCurrencyFromUsd])

  return { isLoading: loading, currencyCode, handleQuotePrice }
}
