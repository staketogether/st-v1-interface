import { useEffect, useState } from 'react'
import useCoinUsdToUserCurrency from './useCoinUsdToUserCurrency'
import useGetCurrencyPrice from './useGetCurrencyPrice'

export default function useCoinConversion(value: string, chainId?: number, contractAddress?: string) {
  const [coinUsdPrice, setCoinUsdPrice] = useState<string | undefined>('0')
  const [loading, setLoading] = useState<boolean>(true)

  const { currencyPriceList, isLoading: loadingCurrencyPrices } = useGetCurrencyPrice()
  const currencyPrice = currencyPriceList.find(currency => currency.id === `${chainId}:${contractAddress?.toLowerCase()}`)?.value ?? 0

  const { handleQuotePrice } = useCoinUsdToUserCurrency()

  useEffect(() => {
    const normalizedAmount = value.replace(',', '.')
    const amount = Number(normalizedAmount)

    if (loadingCurrencyPrices) {
      return
    }

    console.log('amount', amount, 'currencyPrice', currencyPrice, 'loadingCurrencyPrices', loadingCurrencyPrices)

    if (!isNaN(amount) && !isNaN(currencyPrice)) {
      const priceCalc = amount * currencyPrice
      setCoinUsdPrice(priceCalc.toString())
      setLoading(false)
    } else {
      setCoinUsdPrice('0')
      setLoading(false)
    }
  }, [value, currencyPrice, loadingCurrencyPrices])

  return {
    price: coinUsdPrice,
    loading: loading || loadingCurrencyPrices,
    priceConvertedValue: handleQuotePrice(Number(coinUsdPrice) ?? 0)
  }
}
