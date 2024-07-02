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
  contractAddress?: string
}

export default function useQuoteOffRamp({ amount, chainId, provider, paymentMethod, includeMarkup, contractAddress }: useQuoteOffRampProps) {
  const uri = `api/ramp/quote/sell/${provider}?chainId=${chainId}&paymentMethod=${paymentMethod}&amount=${amount}&contractAddress=${contractAddress}${includeMarkup && '&includeMarkup=true'}`

  const { data, error, isLoading, isValidating, mutate } = useSWR<Quote>(
    chainId && Number(amount) && provider && paymentMethod && contractAddress ? uri : null
  )

  return { quote: data, error, isLoading, isValidating, mutate }
}
