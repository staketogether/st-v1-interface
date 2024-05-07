import { PixBankInfo } from '@/hooks/ramp/usePixBankInfo'
import { Asset, AssetId } from '@/types/Asset'
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
export const rampStepControlVar = makeVar<RampSteps>(RampSteps.Quotation)
export const pixBankInfoVar = makeVar<PixBankInfo | undefined>(undefined)
export const offRampPixKeyVar = makeVar<string>('')

export const quoteVar = makeVar<Quote | undefined>(undefined)
export const qrCodeVar = makeVar<BuyRamp | null>(null)
export const kycLevelVar = makeVar<KycLevelInfo | null>(null)
export const kycIdVar = makeVar<string | null>(null)
export const rampAssetIdVar = makeVar<AssetId>('eth-mainnet')

export const clearRampVars = () => {
  qrCodeVar(null)
  kycLevelVar(null)
  kycIdVar(null)
  quoteVar(undefined)
  offRampPixKeyVar('')
  amountToQuoteVar('')
  pixBankInfoVar(undefined)
  rampStepControlVar(RampSteps.Quotation)
  openBrlaModalVar(false)
}

export const openQuoteEthModal = (asset: Asset) => {
  rampStepControlVar(RampSteps.Quotation)
  rampAssetIdVar(asset.id)
  openBrlaModalVar(true)
}

export const changeWalletAddress = () => {
  qrCodeVar(null)
  kycLevelVar(null)
  kycIdVar(null)
  quoteVar(undefined)
  amountToQuoteVar()
  rampStepControlVar(RampSteps.Quotation)
}

export const openModal = (asset: Asset) => {
  rampAssetIdVar(asset.id)
  openBrlaModalVar(true)
}
