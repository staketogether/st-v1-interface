import { Quote } from "@/types/quote.type";
import { makeVar } from "@apollo/client";
import { BuyRamp } from "./useBuyRamp";
import { KycLevelInfo } from "./useKycLevelInfo";

export enum BrlaBuyEthStep {
    Quotation = 'Quotation',
    Kyc = 'Kyc',
    ProcessingKyc = 'ProcessingKyc',
    ProcessingCheckoutStep = 'ProcessingCheckoutStep',
    Checkout = 'Checkout',
    Success = 'Success'

}
export const openModal = makeVar(false)
export const fiatAmountVar = makeVar<string>('0')
export const stepsControlBuyCrypto = makeVar<BrlaBuyEthStep>(BrlaBuyEthStep.Quotation)
export const quoteVar = makeVar<Quote | undefined>(undefined)
export const qrCodeVar = makeVar<BuyRamp | null>(null)
export const kycLevel = makeVar<KycLevelInfo | null>(null)
export const kycId = makeVar<string | null>(null)
