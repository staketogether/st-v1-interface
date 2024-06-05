import { useEffect, useState } from 'react'
import useAssetStats from './useAssetStats'
import useFiatUsdConversion from './useFiatUsdConversion'

export default function useCoinConversion(value: string, chainId?: number, contractAddress?: string) {
  const [coinUsdPrice, setCoinUsdPrice] = useState<string | undefined>('0')
  const [loading, setLoading] = useState<boolean>(true)

  const { assetStats, isLoading } = useAssetStats({ chainId, contractAddress })
  const currencyPrice = assetStats?.currentPriceUsd ?? 0
  const priceChangePercentage24h = assetStats?.priceChangePercentage24h ?? 0

  const { usdToCurrency } = useFiatUsdConversion()

  useEffect(() => {
    const normalizedAmount = value.replace(',', '.')
    const amount = Number(normalizedAmount)

    if (currencyPrice && !isNaN(amount) && !isNaN(currencyPrice) && !isLoading) {
      const priceCalc = amount * currencyPrice
      setCoinUsdPrice(priceCalc.toString())
      setLoading(false)
    } else {
      setCoinUsdPrice('0')
      setLoading(false)
    }
  }, [value, currencyPrice, isLoading])

  return {
    price: coinUsdPrice,
    priceChangePercentage24h: priceChangePercentage24h,
    loading: loading || isLoading,
    priceConvertedValue: usdToCurrency(Number(coinUsdPrice) ?? 0).formatted
  }
}
