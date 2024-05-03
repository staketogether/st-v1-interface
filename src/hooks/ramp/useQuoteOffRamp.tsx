import { PaymentMethodType } from '@/types/payment-method.type'
import { ProviderType } from '@/types/provider.type'
import { Quote } from '@/types/quote.type'
import useSWR from 'swr'
interface useQuoteOffRampProps {
  amount: string
  chainId: number
  provider: ProviderType
  paymentMethod: PaymentMethodType
  includeMarkup: boolean
  tokenSymbol: string
}

export default function useQuoteOffRamp({ amount, chainId, provider, paymentMethod, includeMarkup, tokenSymbol }: useQuoteOffRampProps) {
  const uri = `api/ramp/quote/sell/${provider}?chainId=${chainId}&paymentMethod=${paymentMethod}&amount=${amount}&tokenSymbol=${tokenSymbol}${includeMarkup && '&includeMarkup=true'}`

  const { data, error, isLoading, isValidating, mutate } = useSWR<Quote>(chainId && amount && provider && paymentMethod ? uri : null)
  console.log('data', data)
  return { quote: data, error, isLoading, isValidating, mutate }
}
