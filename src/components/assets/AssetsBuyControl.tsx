import useEthBalanceOf from '@/hooks/contracts/useEthBalanceOf'
import { BrlaBuyEthStep, changeWalletAddress, stepsControlBuyCryptoVar } from '@/hooks/ramp/useControlModal'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { Asset } from '@/types/Asset'
import { useReactiveVar } from '@apollo/client'
import { useEffect } from 'react'
import styled from 'styled-components'
import { useAccount } from 'wagmi'
import CheckoutStep from '../ramp/CheckoutStep'
import GenericErrorComponent from '../ramp/GenericErrorComponent'
import KycStep from '../ramp/KycStep'
import PaymentMethod from '../ramp/PaymentMethod'
import PixKeyStep from '../ramp/PixKeyStep'
import ProcessingCheckoutStep from '../ramp/ProcessingCheckoutStep'
import ProcessingKycStep from '../ramp/ProcessingKycStep'
import QuotationOffRampStep from '../ramp/QuotationOffRamp'
import QuotationStep from '../ramp/QuotationStep'
import SuccessStep from '../ramp/SuccessStep'
import { TimeOutCheckout } from '../ramp/TimeOutCheckout'
import ConnectWallet from '../shared/ConnectWallet'

export default function AssetsBuyControl({ asset, type }: { type: 'buy' | 'sell' | 'swap'; asset: Asset }) {
  const { t } = useLocaleTranslation()
  const { address } = useAccount()
  const { refetch } = useEthBalanceOf({ walletAddress: address, chainId: 1 })

  const steps = {
    MethodPayment: <PaymentMethod asset={asset} />,
    Quotation: <QuotationStep asset={asset} />,
    QuotationOffRamp: <QuotationOffRampStep product={asset} />,
    Kyc: <KycStep asset={asset} />,
    ConnectWallet: <ConnectWallet useModal />,
    ProcessingKyc: <ProcessingKycStep product={asset} type={type} />,
    ProcessingCheckoutStep: <ProcessingCheckoutStep product={asset} type={type} />,
    Checkout: <CheckoutStep asset={asset} />,
    TimeOutCheckout: <TimeOutCheckout asset={asset} />,
    Success: <SuccessStep product={asset} />,
    PixKeyStep: <PixKeyStep asset={asset} />,
    error: <GenericErrorComponent />
  }

  const currentStep = useReactiveVar(stepsControlBuyCryptoVar)

  const titleList: Record<string, string> = {
    Success: t('v2.ramp.success'),
    MethodPayment: t('v2.ramp.provider')
  }
  const title = currentStep in titleList && titleList[currentStep]

  useEffect(() => {
    if (address && currentStep === BrlaBuyEthStep.ConnectWallet) {
      stepsControlBuyCryptoVar(BrlaBuyEthStep.ProcessingKyc)
      return
    }

    if (address && currentStep === BrlaBuyEthStep.Success) {
      refetch()
      return
    }
  }, [address, currentStep, refetch])

  useEffect(() => {
    if (address) {
      changeWalletAddress()
    }
  }, [address])

  return (
    <Container>
      {title && <h2>{title}</h2>}
      {steps[currentStep]}
    </Container>
  )
}

const { Container } = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
    h2 {
      text-align: center;
      font-size: ${({ theme }) => theme.font.size[14]};
      font-weight: 500;
      color: ${({ theme }) => theme.colorV2.gray[1]};
    }
  `
}
