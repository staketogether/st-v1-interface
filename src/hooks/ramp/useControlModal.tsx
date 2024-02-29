import { Quote } from "@/types/quote.type";
import { makeVar } from "@apollo/client";
import { BuyRamp } from "./useBuyRamp";
import { KycLevelInfo } from "./useKycLevelInfo";
import { PixBankInfo } from '@/hooks/ramp/usePixBankInfo'

export enum BrlaBuyEthStep {
    Quotation = 'Quotation',
    Kyc = 'Kyc',
    ProcessingKyc = 'ProcessingKyc',
    ProcessingCheckoutStep = 'ProcessingCheckoutStep',
    Checkout = 'Checkout',
    Success = 'Success'

}
export const openBrlaModalVar = makeVar(false)
export const fiatAmountVar = makeVar<string>('0')
export const stepsControlBuyCryptoVar = makeVar<BrlaBuyEthStep>(BrlaBuyEthStep.Quotation)
export const quoteVar = makeVar<Quote | undefined>(undefined)
export const qrCodeVar = makeVar<BuyRamp | null>(null)
export const kycLevelVar = makeVar<KycLevelInfo | null>(null)
export const kycIdVar = makeVar<string | null>(null)
export const pixBankInfoVar = makeVar<PixBankInfo | undefined>(undefined)
export const clearModal = () => {
    qrCodeVar(null)
    kycLevelVar(null)
    kycIdVar(null)
    quoteVar(undefined)
    fiatAmountVar('0')
    openBrlaModalVar(false)
}
