import { Quote } from "@/types/quote.type";
import { makeVar } from "@apollo/client";

export enum StepBuyEth {
    Quotation = 'Quotation',
    KycStep = 'KycStep',
    ProcessingKyc = 'ProcessingKyc',
    ProcessingCheckoutStep = 'ProcessingCheckoutStep',
    Checkout = 'Checkout'

}
export const openModal = makeVar(true)
export const amountValue = makeVar<string | number>('0')
export const stepBuyCrypto = makeVar<StepBuyEth>(StepBuyEth.Checkout)
export const quoteVar = makeVar<Quote | undefined>(undefined)