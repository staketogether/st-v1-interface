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

export default function useFiatUsdConversion() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const currencyCode = router.query.currency as string

  const userCurrencyFromUsd = useReactiveVar(userCurrencyFromUsdVar)

  const currencyToUsd = useCallback(
    (amount: number, fromCurrency: 'BRL' | 'EUR' | 'USD') => {
      const rate = userCurrencyFromUsd?.[fromCurrency]

      if (!isNaN(amount) && rate && !isNaN(rate)) {
        // Use currency.js to multiply and initially format the amount
        let result = currency(amount, { symbol: '$', precision: 2 })

        // Convert the amount to USD
        result = result.divide(rate)

        return { formatted: result.format(), raw: result.toJSON() }
      } else {
        return { formatted: 'N/A', raw: 0 }
      }
    },
    [userCurrencyFromUsd]
  )

  const usdToCurrency = useCallback(
    (amount: number) => {
      const rate = userCurrencyFromUsd?.[currencyCode.toUpperCase()]
      const symbol = currencySymbols[currencyCode.toUpperCase() as keyof typeof currencySymbols] || '$'

      if (!isNaN(amount) && rate && !isNaN(rate)) {
        // Use currency.js to multiply and initially format the amount
        const result = currency(amount, { symbol: '$', precision: 2 }).multiply(rate)

        // Replace the generic dollar symbol with the specific currency symbol
        return { formatted: result.format().replace('$', `${symbol} `), raw: result.toJSON() }
      } else {
        return { formatted: 'N/A', raw: 0 }
      }
    },
    [userCurrencyFromUsd, currencyCode]
  )

  useEffect(() => {
    if (userCurrencyFromUsd) {
      setLoading(false)
    }
  }, [userCurrencyFromUsd])

  return { isLoading: loading, currencyCode, currencyToUsd, usdToCurrency }
}
