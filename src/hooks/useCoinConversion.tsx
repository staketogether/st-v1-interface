import { useEffect, useState } from 'react'
import useCoinUsdToUserCurrency from './useCoinUsdToUserCurrency'
import useGetCurrencyPrice from './useGetCurrencyPrice'

export default function useCoinConversion(value: string, chainId?: number, contractAddress?: string) {
  const [coinUsdPrice, setCoinUsdPrice] = useState<string | undefined>('0')
  const [loading, setLoading] = useState<boolean>(true)

  const { currencyPriceList, isLoading: loadingCurrencyPrices } = useGetCurrencyPrice()
  const currencyPrice = currencyPriceList.find(currency => currency.id === `${chainId}:${contractAddress?.toLowerCase()}`)
  const { handleQuotePrice } = useCoinUsdToUserCurrency()

  useEffect(() => {
    const normalizedAmount = value.replace(',', '.')
    const amount = Number(normalizedAmount)

    if (loadingCurrencyPrices) {
      return
    }

    if (currencyPrice?.value && !isNaN(amount) && !isNaN(currencyPrice?.value)) {
      const priceCalc = amount * currencyPrice.value
      setCoinUsdPrice(priceCalc.toString())
      setLoading(false)
    } else {
      setCoinUsdPrice('0')
      setLoading(false)
    }
  }, [value, currencyPrice, loadingCurrencyPrices])

  return {
    price: coinUsdPrice,
    priceChangePercentage24h: currencyPrice?.priceChangePercentage24h,
    loading: loading || loadingCurrencyPrices,
    priceConvertedValue: handleQuotePrice(Number(coinUsdPrice) ?? 0)
  }
}
