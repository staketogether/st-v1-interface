import { PixBankInfo } from '@/hooks/ramp/usePixBankInfo'
import { Asset, AssetId } from '@/types/Asset'
import { Quote } from '@/types/quote.type'
import { makeVar } from '@apollo/client'
import { BuyRamp } from './useBuyRamp'
import { KycLevelInfo } from './useKycLevelInfo'

export enum BrlaBuyEthStep {
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
export const stepsControlBuyCryptoVar = makeVar<BrlaBuyEthStep>(BrlaBuyEthStep.Quotation)
export const pixBankInfoVar = makeVar<PixBankInfo | undefined>(undefined)
export const offRampPixKeyVar = makeVar<string>('')

export const quoteVar = makeVar<Quote | undefined>(undefined)
export const qrCodeVar = makeVar<BuyRamp | null>(null)
export const kycLevelVar = makeVar<KycLevelInfo | null>(null)
export const kycIdVar = makeVar<string | null>(null)
export const rampAssetIdVar = makeVar<AssetId>('eth-mainnet')

export const clearModal = () => {
  qrCodeVar(null)
  kycLevelVar(null)
  kycIdVar(null)
  quoteVar(undefined)
  amountToQuoteVar('')
  stepsControlBuyCryptoVar(BrlaBuyEthStep.Quotation)
  openBrlaModalVar(false)
}

export const openQuoteEthModal = (asset: Asset) => {
  stepsControlBuyCryptoVar(BrlaBuyEthStep.Quotation)
  rampAssetIdVar(asset.id)
  openBrlaModalVar(true)
}

export const changeWalletAddress = () => {
  qrCodeVar(null)
  kycLevelVar(null)
  kycIdVar(null)
  quoteVar(undefined)
  amountToQuoteVar()
  stepsControlBuyCryptoVar(BrlaBuyEthStep.Quotation)
}

export const openModal = (asset: Asset) => {
  rampAssetIdVar(asset.id)
  openBrlaModalVar(true)
}
