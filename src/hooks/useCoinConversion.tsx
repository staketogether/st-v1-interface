import { useEffect, useState } from 'react'
import useCoinUsdToUserCurrency from './useCoinUsdToUserCurrency'
import { currencyPriceListVar } from './useGetCurrencyPrice'
import { useReactiveVar } from '@apollo/client'

export default function useCoinConversion(value: string, chainId?: number, contractAddress?: string) {
  const [coinUsdPrice, setCoinUsdPrice] = useState<string | undefined>('0')
  const [loading, setLoading] = useState<boolean>(true)

  const currencyPriceList = useReactiveVar(currencyPriceListVar)

  const currencyPrice = currencyPriceList.find(
    currency => currency.id.toLocaleLowerCase() === `${chainId}:${contractAddress?.toLowerCase()}`
  )

  const { handleQuotePrice } = useCoinUsdToUserCurrency()

  useEffect(() => {
    const normalizedAmount = value.replace(',', '.')
    const amount = Number(normalizedAmount)

    if (!currencyPriceList.length) {
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
  }, [value, currencyPrice, currencyPriceList])

  return {
    price: coinUsdPrice,
    priceChangePercentage24h: currencyPrice?.priceChangePercentage24h,
    loading: loading || !currencyPriceList.length,
    priceConvertedValue: handleQuotePrice(Number(coinUsdPrice) ?? 0)
  }
}
