import { useReactiveVar } from '@apollo/client/react/hooks/useReactiveVar'
import { useEffect, useState } from 'react'
import useCoinUsdToUserCurrency from './useCoinUsdToUserCurrency'
import { currencyPriceListVar } from './useGetCurrencyPrice'

export default function useCoinConversion(amountValue: string, coinPriceNetwork: string) {
  const [coinUsdPrice, setCoinUsdPrice] = useState<string | undefined>('0')
  const [loading, setLoading] = useState<boolean>(true)

  const currencyPriceList = useReactiveVar(currencyPriceListVar)
  const currencyPrice = currencyPriceList.find(currency => currency.name === coinPriceNetwork)?.value || 0

  const { handleQuotePrice } = useCoinUsdToUserCurrency()

  useEffect(() => {
    const normalizedAmount = amountValue.replace(',', '.')
    const amount = Number(normalizedAmount)

    if (!isNaN(amount) && !isNaN(currencyPrice)) {
      const priceCalc = amount * currencyPrice
      setCoinUsdPrice(priceCalc.toString())
      setLoading(false)
    } else {
      setCoinUsdPrice('0')
      setLoading(false)
    }
  }, [amountValue, currencyPrice])

  return { price: coinUsdPrice, loading, priceConvertedValue: handleQuotePrice(Number(coinUsdPrice ?? 0)) }
}
