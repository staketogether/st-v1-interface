import { RampSteps, clearRampVars, rampStepControlVar } from '@/hooks/ramp/useRampControlModal'
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
import ProcessingCheckoutOffRampStep from '../ramp/ProcessingCheckoutOffRampStep'
import ProcessingCheckoutStep from '../ramp/ProcessingCheckoutStep'
import ProcessingKycStep from '../ramp/ProcessingKycStep'
import QuotationOffRampStep from '../ramp/QuotationOffRamp'
import QuotationStep from '../ramp/QuotationStep'
import SuccessStep from '../ramp/SuccessStep'
import { TimeOutCheckout } from '../ramp/TimeOutCheckout'
import ConnectWallet from '../shared/ConnectWallet'

export default function AssetsRampControl({ asset, type }: { type: 'buy' | 'sell' | 'swap'; asset: Asset }) {
  const { t } = useLocaleTranslation()
  const { address: walletAddress } = useAccount()

  const currentStep = useReactiveVar(rampStepControlVar)

  const titleList: Record<string, string> = {
    Success: type === 'buy' ? t('v2.ramp.onRamp.success') : t('v2.ramp.offRamp.success'),
    MethodPayment: t('v2.ramp.provider')
  }

  const title = currentStep ? currentStep in titleList && titleList[currentStep] : ''

  useEffect(() => {
    if (walletAddress && currentStep && currentStep === RampSteps.ConnectWallet) {
      rampStepControlVar(RampSteps.ProcessingKyc)
      return
    }
  }, [walletAddress, currentStep])

  useEffect(() => {
    if (walletAddress) {
      clearRampVars()
    }
  }, [walletAddress])

  const steps = {
    MethodPayment: <PaymentMethod asset={asset} />,
    Quotation: <QuotationStep asset={asset} />,
    QuotationOffRamp: <QuotationOffRampStep asset={asset} />,
    Kyc: <KycStep asset={asset} />,
    ConnectWallet: <ConnectWallet useModal />,
    ProcessingKyc: <ProcessingKycStep product={asset} type={type} />,
    ProcessingCheckoutStep: <ProcessingCheckoutStep product={asset} type={type} />,
    Checkout: <CheckoutStep asset={asset} type={type} />,
    TimeOutCheckout: <TimeOutCheckout asset={asset} />,
    Success: <SuccessStep product={asset} type={type} />,
    PixKeyStep: <PixKeyStep />,
    ProcessingCheckoutOffRampStep: <ProcessingCheckoutOffRampStep walletAddress={walletAddress} asset={asset} type={type} />,
    error: <GenericErrorComponent />
  }

  return (
    <Container>
      {title && <h2>{title}</h2>}
      {currentStep && steps[currentStep]}
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
