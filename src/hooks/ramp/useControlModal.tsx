import { Quote } from "@/types/quote.type";
import { makeVar } from "@apollo/client";

export enum StepBuyEth {
    Quotation = 'quotation',
    Checkout = 'checkout'

}
export const openModal = makeVar(false)
export const amountValue = makeVar<string | number>('0')
export const stepBuyCrypto = makeVar<StepBuyEth>(StepBuyEth.Quotation)
export const quoteVar = makeVar<Quote | undefined>(undefined)