import { TokenBalance } from '@/hooks/contracts/useBalanceOf'
import { RampSteps, clearRampVars, rampStepControlVar } from '@/hooks/ramp/useRampControlModal'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { useReactiveVar } from '@apollo/client'
import { useEffect } from 'react'
import styled from 'styled-components'
import { useAccount } from 'wagmi'
import CheckoutStep from '../../ramp/CheckoutStep'
import GenericErrorComponent from '../../ramp/GenericErrorComponent'
import KycStep from '../../ramp/KycStep'
import PaymentMethod from '../../ramp/PaymentMethod'
import PixKeyStep from '../../ramp/PixKeyStep'
import ProcessingCheckoutOffRampStep from '../../ramp/ProcessingCheckoutOffRampStep'
import ProcessingCheckoutStep from '../../ramp/ProcessingCheckoutStep'
import ProcessingKycStep from '../../ramp/ProcessingKycStep'
import QuotationOffRampStep from '../../ramp/QuotationOffRamp'
import QuotationStep from '../../ramp/QuotationStep'
import SuccessStep from '../../ramp/SuccessStep'
import { TimeOutCheckout } from '../../ramp/TimeOutCheckout'
import ConnectWallet from '../../shared/ConnectWallet'
import { Asset } from '@/types/Asset'

interface AssetsRampControlProps {
  type: 'buy' | 'sell'
  asset?: Asset
  chainId: number
  userTokenBalance: TokenBalance
  userTokenIsLoading: boolean
  userTokenRefetch: () => void
}

export default function AssetsRampControl({
  asset,
  chainId,
  type,
  userTokenBalance,
  userTokenIsLoading,
  userTokenRefetch
}: AssetsRampControlProps) {
  const { t } = useLocaleTranslation()
  const { address: walletAddress } = useAccount()

  const currentStep = useReactiveVar(rampStepControlVar)
  useEffect(() => {
    if (!currentStep) rampStepControlVar(type === 'buy' ? RampSteps.Quotation : RampSteps.QuotationOffRamp)
  }, [currentStep, type])

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
      clearRampVars(type)
    }
  }, [walletAddress, type])

  const steps = {
    MethodPayment: <PaymentMethod chainId={chainId} asset={asset} />,
    Quotation: <QuotationStep chainId={chainId} asset={asset} />,
    QuotationOffRamp: (
      <QuotationOffRampStep chainId={chainId} asset={asset} userTokenBalance={userTokenBalance} userTokenIsLoading={userTokenIsLoading} />
    ),
    Kyc: <KycStep asset={asset} chainId={chainId} />,
    ConnectWallet: <ConnectWallet useModal />,
    ProcessingKyc: <ProcessingKycStep asset={asset} chainId={chainId} type={type} />,
    ProcessingCheckoutStep: <ProcessingCheckoutStep asset={asset} chainId={chainId} type={type} />,
    Checkout: <CheckoutStep chainId={chainId} asset={asset} type={type} />,
    TimeOutCheckout: <TimeOutCheckout type={type} />,
    Success: <SuccessStep asset={asset} type={type} />,
    PixKeyStep: <PixKeyStep />,
    ProcessingCheckoutOffRampStep: (
      <ProcessingCheckoutOffRampStep
        chainId={chainId}
        userTokenRefetch={userTokenRefetch}
        walletAddress={walletAddress}
        asset={asset}
        type={type}
      />
    ),
    error: <GenericErrorComponent type={type} />
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
