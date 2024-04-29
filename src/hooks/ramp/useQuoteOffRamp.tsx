import { PaymentMethodType } from '@/types/payment-method.type'
import { ProviderType } from '@/types/provider.type'
import { Quote } from '@/types/quote.type'
import useSWR from 'swr'

export default function useQuoteOffRamp(
  amount?: string,
  chainId?: number,
  provider?: ProviderType,
  paymentMethod?: PaymentMethodType,
  toChain?: string,
  toToken?: string,
  includeMarkup?: boolean
) {
  let url = `api/ramp/quote/sell/${provider}?chainId=${chainId}&paymentMethod=${paymentMethod}&amount=${amount}&includeMarkup=${includeMarkup}`
  if (toChain && toToken) {
    url += `&toChain=${toChain}&toToken=${toToken}`
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR<Quote>(
    chainId && amount && provider && paymentMethod ? url : null
  )

  return { quote: data, error, isLoading, isValidating, mutate }
}
