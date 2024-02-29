import { Quote } from "@/types/quote.type";
import { makeVar } from "@apollo/client";
import { BuyRamp } from "./useBuyRamp";
import { KycLevelInfo } from "./useKycLevelInfo";

export enum BrlaBuyEthStep {
    MethodPayment = 'MethodPayment',
    Quotation = 'Quotation',
    Kyc = 'Kyc',
    ProcessingKyc = 'ProcessingKyc',
    ProcessingCheckoutStep = 'ProcessingCheckoutStep',
    Checkout = 'Checkout',
    Success = 'Success'

}
export const openModal = makeVar(true)
export const fiatAmountVar = makeVar<string>('0')
export const stepsControlBuyCrypto = makeVar<BrlaBuyEthStep>(BrlaBuyEthStep.MethodPayment)
export const quoteVar = makeVar<Quote | undefined>(undefined)
export const qrCodeVar = makeVar<BuyRamp | null>(null)
export const kycLevel = makeVar<KycLevelInfo | null>(null)
export const kycId = makeVar<string | null>(null)
export const clearModal = () => {
    qrCodeVar(null)
    kycLevel(null)
    kycId(null)
    quoteVar(undefined)
    fiatAmountVar('0')
    openModal(false)
}
