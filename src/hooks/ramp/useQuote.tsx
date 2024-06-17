import { PaymentMethodType } from '@/types/payment-method.type'
import { RampProviderType } from '@/types/rampProviderType'
import { Quote } from '@/types/quote.type'
import useSWR from 'swr'

export default function useQuoteRamp(
  fiatCurrencyCode: string,
  amount?: number | string,
  chainId?: number,
  fixOutput = false,
  provider?: RampProviderType,
  paymentMethod?: PaymentMethodType,
  toChain?: string,
  toToken?: string,
  includeMarkup?: boolean,
  refreshInterval?: number
) {
  let url = `api/ramp/quote/${provider}?chainId=${chainId}&paymentMethod=${paymentMethod}&fiatCurrencyCode=${fiatCurrencyCode}&amount=${amount}&fixOutput=${fixOutput}&includeMarkup=${includeMarkup}`
  if (toChain) {
    url += `&toChain=${toChain}`
  }
  if (toToken) {
    url += `&toToken=${toToken}`
  }

  const { data, error, isLoading, isValidating } = useSWR<Quote>(
    chainId && fiatCurrencyCode && amount && provider && paymentMethod ? url : null,
    {
      refreshInterval
    }
  )

  return { quote: data, error, isLoading, isValidating }
}
