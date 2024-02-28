import { globalConfig } from '@/config/global'
import { ConversionRates, ExchangeRateApiResponse } from '@/types/usdQuote'
import { makeVar } from '@apollo/client'
import axios from 'axios'
import useSWR from 'swr'

export const userCurrencyFromUsdVar = makeVar<ConversionRates | null>(null)

export default function useGetUsdConversionRatesPrice() {
  const { backendUrl } = globalConfig
  const fetcher = (uri: string) => axios.get(`${backendUrl}/${uri}`).then(res => res.data)

  useSWR<ExchangeRateApiResponse>(`fiat-currency-quote/UsdAllUsdQuote`, fetcher, {
    onSuccess: data => {
      const priceQuotation = data.conversion_rates

      if (priceQuotation) {
        userCurrencyFromUsdVar(priceQuotation)
      }
    }
  })
}
