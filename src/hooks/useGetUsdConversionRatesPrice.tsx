import { globalConfig } from '@/config/global'
import { ConversionRates, ExchangeRateApiResponse } from '@/types/usdQuote'
import { makeVar } from '@apollo/client'
import axios from 'axios'
import useSWR from 'swr'

export const userCurrencyFromUsdVar = makeVar<ConversionRates | null>(null)

export default function useGetUsdConversionRatesPrice() {
  const { backendUrl } = globalConfig
  const fetcher = (uri: string) => axios.get<ExchangeRateApiResponse>(`${backendUrl}/${uri}`).then(res => res.data)

  useSWR<ExchangeRateApiResponse>(`api/fiat-currency-quote/usd-quotations`, fetcher, {
    onSuccess: data => {
      const priceQuotation = data.conversion_rates

      if (priceQuotation) {
        userCurrencyFromUsdVar(priceQuotation)
      }
    }
  })
}
