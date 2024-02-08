import { globalConfig } from "@/config/global";
import { PaymentMethodType } from "@/types/payment-method.type";
import { ProviderType } from "@/types/provider.type";
import { Quote } from "@/types/quote.type";
import axios, { HttpStatusCode } from "axios";

const { backendUrl } = globalConfig
const baseApi = `${backendUrl}/api/ramp`


export async function quoteRamp(chainId: number, paymentMethod: PaymentMethodType, fiatCurrencyCode: string, amount: number, isCryptoAmount: number, provider: ProviderType): Promise<Quote | null> {

    if (amount < 300) {
        return null
    }
    try {
        const url = `${baseApi}/quote/${provider}?chainId=${chainId}&paymentMethod=${paymentMethod}&fiatCurrencyCode=${fiatCurrencyCode}&amount=${amount}&isCryptoAmount=${isCryptoAmount}`
        const responseQuote = await axios.get<Quote>(url)
        if (responseQuote.status === HttpStatusCode.Ok) {
            return responseQuote?.data
        }
        return null
    } catch {
        return null
    }

}