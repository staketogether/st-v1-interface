import { PaymentMethodType } from "@/types/payment-method.type"
import { ProviderType } from "@/types/provider.type"
import { Quote } from "@/types/quote.type"
import useSWR from "swr"
import { quoteVar } from "./useControlModal"


export default function useQuoteRamp(
    fiatCurrencyCode: string,
    amount?: number,
    chainId?: number,
    isCryptoAmount: number = 0,
    provider?: ProviderType,
    paymentMethod?: PaymentMethodType,
    toChain?: string,
    toToken?: string
) {
    let url = `api/ramp/quote/${provider}?chainId=${chainId}&paymentMethod=${paymentMethod}&fiatCurrencyCode=${fiatCurrencyCode}&amount=${amount}&isCryptoAmount=${isCryptoAmount}`
    if (toChain && toToken) {
        url += `&toChain=${toChain}&toToken=${toToken}`
    }
    const { data, error, isLoading, isValidating } = useSWR<Quote>((chainId && fiatCurrencyCode && amount && provider && paymentMethod) ? url : null, { refreshInterval: 6000, revalidateOnMount: true })
    quoteVar(data)
    return { quote: data, error, isLoading, isValidating }


}
