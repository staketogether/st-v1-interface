import { PixBankInfo } from '@/hooks/ramp/usePixBankInfo'
import { ProductAsset, ProductAssetName } from '@/types/ProductAsset'
import { Quote } from '@/types/quote.type'
import { makeVar } from '@apollo/client'
import { BuyRamp } from './useBuyRamp'
import { KycLevelInfo } from './useKycLevelInfo'

export enum BrlaBuyEthStep {
  MethodPayment = 'MethodPayment',
  Quotation = 'Quotation',
  QuotationOfRamp = 'QuotationOfRamp',
  PixKeyStep = 'PixKeyStep',
  Kyc = 'Kyc',
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
export const fiatAmountVar = makeVar<string>('')
export const typeRampVar = makeVar<'buy' | 'sell'>('buy')
export const stepsControlBuyCryptoVar = makeVar<BrlaBuyEthStep>(BrlaBuyEthStep.MethodPayment)
export const quoteVar = makeVar<Quote | undefined>(undefined)
export const qrCodeVar = makeVar<BuyRamp | null>(null)
export const kycLevelVar = makeVar<KycLevelInfo | null>(null)
export const kycIdVar = makeVar<string | null>(null)
export const pixBankInfoVar = makeVar<PixBankInfo | undefined>(undefined)
export const currentProductNameVar = makeVar<ProductAssetName>('eth-optimism')

export const clearModal = () => {
  qrCodeVar(null)
  kycLevelVar(null)
  kycIdVar(null)
  quoteVar(undefined)
  fiatAmountVar('')
  stepsControlBuyCryptoVar(BrlaBuyEthStep.MethodPayment)
  openBrlaModalVar(false)
}

export const openQuoteEthModal = (asset: ProductAsset) => {
  stepsControlBuyCryptoVar(BrlaBuyEthStep.Quotation)
  currentProductNameVar(asset.name)
  openBrlaModalVar(true)
}

export const changeWalletAddress = () => {
  qrCodeVar(null)
  kycLevelVar(null)
  kycIdVar(null)
  quoteVar(undefined)
  fiatAmountVar()
  stepsControlBuyCryptoVar(BrlaBuyEthStep.MethodPayment)
}

export const openModal = (productName: ProductAssetName) => {
  currentProductNameVar(productName)
  openBrlaModalVar(true)
}
