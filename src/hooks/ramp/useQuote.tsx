import { quoteRamp } from "@/services/ramp"
import { PaymentMethodType } from "@/types/payment-method.type"
import { ProviderType } from "@/types/provider.type"
import { Quote } from "@/types/quote.type"
import { useCallback, useEffect, useState } from "react"

export default function useQuoteRamp(
    chainId: number, fiatCurrencyCode: string, amount?: number, isCryptoAmount?: number, provider?: ProviderType, paymentMethod?: PaymentMethodType
) {
    const [quote, setQuote] = useState<Quote | null>()
    const handleQuote = useCallback(async (): Promise<void> => {
        setQuote(undefined)
        if (!!paymentMethod && !!provider && !!amount && !!fiatCurrencyCode) {
            const quoteRampResult = await quoteRamp(chainId, paymentMethod, fiatCurrencyCode, amount, isCryptoAmount ?? 0, provider)
            setQuote(quoteRampResult)
        }

    }, [amount, chainId, fiatCurrencyCode, isCryptoAmount, paymentMethod, provider])

    useEffect(() => {

        handleQuote()

    }, [amount, fiatCurrencyCode, handleQuote, paymentMethod, provider, quote])


    return { quote, handleQuote }


}