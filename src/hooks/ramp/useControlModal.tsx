import { chainConfigByChainId } from '@/config/chain';
import { PixBankInfo } from '@/hooks/ramp/usePixBankInfo';
import { AllowedNetwork, handleChainIdByNetwork } from '@/services/format';
import { Network, StakingProduct } from '@/types/Product';
import { Quote } from '@/types/quote.type';
import { makeVar } from '@apollo/client';
import { BuyRamp } from './useBuyRamp';
import { KycLevelInfo } from './useKycLevelInfo';

export enum BrlaBuyEthStep {
  MethodPayment = 'MethodPayment',
  Quotation = 'Quotation',
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
}
export const openBrlaModalVar = makeVar(false)
export const fiatAmountVar = makeVar<string>('')
export const stepsControlBuyCryptoVar = makeVar<BrlaBuyEthStep>(BrlaBuyEthStep.MethodPayment)
export const quoteVar = makeVar<Quote | undefined>(undefined)
export const qrCodeVar = makeVar<BuyRamp | null>(null)
export const kycLevelVar = makeVar<KycLevelInfo | null>(null)
export const kycIdVar = makeVar<string | null>(null)
export const pixBankInfoVar = makeVar<PixBankInfo | undefined>(undefined)
export const depositConfigVar = makeVar<DepositConfig | undefined>(undefined)
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
  fiatAmountVar()
  stepsControlBuyCryptoVar(BrlaBuyEthStep.MethodPayment)
}



export const openModal = (stakingProduct: StakingProduct, network: Network) => {

  const chainId = handleChainIdByNetwork(network as AllowedNetwork)
  const { isTestnet } = chainConfigByChainId(chainId)
  const depositChainByProduct: {
    [key: string]: DepositConfig
  } = {
    'ethereum-stake': {
      depositChanId: isTestnet ? 11155111 : 1
    },
    'ethereum-restaking': {
      depositChanId: isTestnet ? 80001 : 137,
      bridgeChanIn: 10
    },
  }
  depositConfigVar(depositChainByProduct[stakingProduct])
  openBrlaModalVar(true)

}
