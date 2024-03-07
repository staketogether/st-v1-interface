import { PixBankInfo } from '@/hooks/ramp/usePixBankInfo'
import { Quote } from '@/types/quote.type'
import { makeVar } from '@apollo/client'
import { BuyRamp } from './useBuyRamp'
import { KycLevelInfo } from './useKycLevelInfo'

export enum BrlaBuyEthStep {
  MethodPayment = 'MethodPayment',
  Quotation = 'Quotation',
  Kyc = 'Kyc',
  ConnectWallet = 'ConnectWallet',
  ProcessingKyc = 'ProcessingKyc',
  ProcessingCheckoutStep = 'ProcessingCheckoutStep',
  Checkout = 'Checkout',
  Success = 'Success',
  Error = 'error'
}
export const openBrlaModalVar = makeVar(false)
export const fiatAmountVar = makeVar<string>('')
export const stepsControlBuyCryptoVar = makeVar<BrlaBuyEthStep>(BrlaBuyEthStep.MethodPayment)
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
  fiatAmountVar('')
  openBrlaModalVar(false)
}

export const openQuoteEthModal = () => {
  stepsControlBuyCryptoVar(BrlaBuyEthStep.MethodPayment)
  openBrlaModalVar(true)
}

export const changeWalletAddress = () => {
  qrCodeVar(null)
  kycLevelVar(null)
  kycIdVar(null)
  quoteVar(undefined)
  fiatAmountVar('')
  stepsControlBuyCryptoVar(BrlaBuyEthStep.MethodPayment)
}
