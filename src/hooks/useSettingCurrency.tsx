import { makeVar, useReactiveVar } from '@apollo/client'
import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { Currency, CurrencySymbol, CurrencyType, Settings } from '@/types/Settings'
import { useRouter } from 'next/router'

const reactiveVar = makeVar<Currency>({ value: CurrencyType.USD, symbol: CurrencySymbol.USD })

export default function useSettingsCurrency() {
  const currency = useReactiveVar(reactiveVar)
  const { getItem, setItem } = useLocalStorage()
  const router = useRouter()

  useEffect(() => {
    const localStorageItem = getItem('settings')
    const settings = localStorageItem ? (JSON.parse(localStorageItem) as Settings) : null
    if (settings) {
      reactiveVar({ value: settings.currency.value, symbol: settings.currency.symbol })
      return
    }
    if (router.locale === 'pt') {
      reactiveVar({ value: CurrencyType.BRL, symbol: CurrencySymbol.BRL })
      setItem(
        'settings',
        JSON.stringify({ language: '', currency: { value: CurrencyType.BRL, symbol: CurrencySymbol.BRL } })
      )
    }
    if (router.locale === 'es') {
      reactiveVar({ value: CurrencyType.EUR, symbol: CurrencySymbol.EUR })
      setItem(
        'settings',
        JSON.stringify({ language: '', currency: { value: CurrencyType.EUR, symbol: CurrencySymbol.EUR } })
      )
    }
    if (router.locale === 'en') {
      reactiveVar({ value: CurrencyType.USD, symbol: CurrencySymbol.USD })
      setItem(
        'settings',
        JSON.stringify({ language: '', currency: { value: CurrencyType.USD, symbol: CurrencySymbol.USD } })
      )
    }
  }, [getItem, router.locale, setItem])
  const setCurrency = (value: Currency) => reactiveVar(value)

  return { currency, setCurrency }
}
