import { useReactiveVar } from '@apollo/client/react/hooks/useReactiveVar'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { userCurrencyFromUsdVar } from './useGetUsdConversionRatesPrice'

export default function useCoinUsdToUserCurrency() {
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  const currency = router.query.currency as string
  const locale = router.locale

  const userCurrencyFromUsd = useReactiveVar(userCurrencyFromUsdVar)

  const FormatValue = useCallback(
    (amount: number, currency: string) => {
      switch (locale) {
        case 'pt':
          return new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(amount)
        case 'es':
          return new Intl.NumberFormat('es-ES', { style: 'currency', currency }).format(amount)
        default:
          return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
      }
    },
    [locale]
  )

  useEffect(() => {
    if (userCurrencyFromUsd) {
      setLoading(false)
    }
  }, [userCurrencyFromUsd])

  const handleQuotePrice = useCallback(
    (amount: number) => {
      if (!isNaN(amount) && userCurrencyFromUsd && !isNaN(userCurrencyFromUsd[currency.toUpperCase()])) {
        return FormatValue(amount * userCurrencyFromUsd[currency.toUpperCase()], currency.toUpperCase())
          .replace('US$', '$')
          .replace('$', '$ ')
          .replace('$  ', '$ ')
      } else {
        return 0
      }
    },
    [userCurrencyFromUsd, currency, FormatValue]
  )

  return { isLoading: loading, settingCurrency: currency, handleQuotePrice }
}
