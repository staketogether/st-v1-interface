import { Quote } from "@/types/quote.type";
import { makeVar } from "@apollo/client";
import { BuyRamp } from "./useBuyRamp";

export enum StepBuyEth {
    Quotation = 'Quotation',
    KycStep = 'KycStep',
    ProcessingKyc = 'ProcessingKyc',
    ProcessingCheckoutStep = 'ProcessingCheckoutStep',
    Checkout = 'Checkout',
    Success = 'Success'

}
export const openModal = makeVar(false)
export const amountValue = makeVar<string | number>('0')
export const stepBuyCrypto = makeVar<StepBuyEth>(StepBuyEth.Quotation)
export const quoteVar = makeVar<Quote | undefined>(undefined)
export const qrCodeVar = makeVar<BuyRamp | null>(null)