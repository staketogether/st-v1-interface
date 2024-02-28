import { PaymentMethodType } from "@/types/payment-method.type"
import { ProviderType } from "@/types/provider.type"
import { Quote } from "@/types/quote.type"
import useSWR from "swr"
import { quoteVar } from "./useControlModal"


export default function useQuoteRamp(
    chainId: number, fiatCurrencyCode: string, amount?: number, isCryptoAmount: number = 0, provider?: ProviderType, paymentMethod?: PaymentMethodType
) {
    const url = `api/ramp/quote/${provider}?chainId=${chainId}&paymentMethod=${paymentMethod}&fiatCurrencyCode=${fiatCurrencyCode}&amount=${amount}&isCryptoAmount=${isCryptoAmount}`
    const { data, error } = useSWR<Quote>((chainId && fiatCurrencyCode && amount && provider && paymentMethod) ? url : null, { refreshInterval: 5000 })
    quoteVar(data)
    return { quote: data, error }


}