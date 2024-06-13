import { PixBankInfo } from '@/hooks/ramp/usePixBankInfo'
import { AssetId } from '@/types/Asset'
import { Quote } from '@/types/quote.type'
import { makeVar } from '@apollo/client'
import { BuyRamp } from './useBuyRamp'
import { KycLevelInfo } from './useKycLevelInfo'

export enum RampSteps {
  MethodPayment = 'MethodPayment',
  Quotation = 'Quotation',
  QuotationOffRamp = 'QuotationOffRamp',
  Kyc = 'Kyc',
  ProcessingCheckoutOffRampStep = 'ProcessingCheckoutOffRampStep',
  PixKeyStep = 'PixKeyStep',
  ConnectWallet = 'ConnectWallet',
  ProcessingKyc = 'ProcessingKyc',
  ProcessingCheckoutStep = 'ProcessingCheckoutStep',
  Checkout = 'Checkout',
  TimeOutCheckout = 'TimeOutCheckout',
  Success = 'Success',
  Error = 'error'
}
export enum DepositType {
  Ethereum = 'Ethereum',
  Polygon = 'Polygon'
}
export interface DepositConfig {
  depositChanId: number
  bridgeChanIn?: number
  toChain?: string
  toToken?: string
}
export const openBrlaModalVar = makeVar(false)

export const amountToQuoteVar = makeVar<string>('')
export const rampStepControlVar = makeVar<RampSteps | undefined>(undefined)
export const pixBankInfoVar = makeVar<PixBankInfo | undefined>(undefined)
export const offRampPixKeyVar = makeVar<string>('')

export const quoteVar = makeVar<Quote | undefined>(undefined)
export const qrCodeVar = makeVar<BuyRamp | null>(null)
export const kycLevelVar = makeVar<KycLevelInfo | null>(null)
export const kycIdVar = makeVar<string | null>(null)
export const rampAssetIdVar = makeVar<AssetId>('eth-mainnet')

export const clearRampVars = (type: 'buy' | 'sell') => {
  qrCodeVar(null)
  kycLevelVar(null)
  kycIdVar(null)
  quoteVar(undefined)
  offRampPixKeyVar('')
  amountToQuoteVar('')
  pixBankInfoVar(undefined)
  rampStepControlVar(type === 'buy' ? RampSteps.Quotation : RampSteps.QuotationOffRamp)
  openBrlaModalVar(false)
}
