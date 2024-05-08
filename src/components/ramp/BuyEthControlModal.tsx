import Modal from '@/components/shared/Modal'
import {
  RampSteps,
  changeWalletAddress,
  clearRampVars,
  rampAssetIdVar,
  openBrlaModalVar,
  rampStepControlVar
} from '@/hooks/ramp/useRampControlModal'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { useReactiveVar } from '@apollo/client'
import { useEffect } from 'react'
import styled from 'styled-components'
import { useAccount } from 'wagmi'
import ConnectWallet from '../shared/ConnectWallet'
import CheckoutStep from './CheckoutStep'
import GenericErrorComponent from './GenericErrorComponent'
import KycStep from './KycStep'
import PaymentMethod from './PaymentMethod'
import ProcessingCheckoutStep from './ProcessingCheckoutStep'
import ProcessingKycStep from './ProcessingKycStep'
import QuotationOffRampStep from './QuotationOffRamp'
import QuotationStep from './QuotationStep'
import SuccessStep from './SuccessStep'
import { TimeOutCheckout } from './TimeOutCheckout'
import { getAssetById } from '@/config/product/asset'

export default function BuyEthControlModal() {
  const { t } = useLocaleTranslation()
  const { address } = useAccount()

  const rampAssetId = useReactiveVar(rampAssetIdVar)
  const asset = getAssetById(rampAssetId)

  const steps = {
    MethodPayment: <PaymentMethod asset={asset} />,
    Quotation: <QuotationStep asset={asset} />,
    QuotationOffRamp: <QuotationOffRampStep asset={asset} />,
    Kyc: <KycStep asset={asset} />,
    ConnectWallet: <ConnectWallet useModal />,
    ProcessingKyc: <ProcessingKycStep product={asset} type={'buy'} />,
    ProcessingCheckoutStep: <ProcessingCheckoutStep product={asset} type={'buy'} />,
    Checkout: <CheckoutStep asset={asset} type={'buy'} />,
    TimeOutCheckout: <TimeOutCheckout asset={asset} />,
    Success: <SuccessStep product={asset} />,
    error: <GenericErrorComponent />
  }

  const controlModal = useReactiveVar(openBrlaModalVar)
  const currentStep = useReactiveVar(rampStepControlVar)
  const titleList: Record<string, string> = {
    Success: t('v2.ramp.success'),
    MethodPayment: t('v2.ramp.provider')
  }
  const title = currentStep in titleList ? titleList[currentStep] : t('v2.ramp.title').replace('symbol', asset.symbol)

  useEffect(() => {
    if (address && currentStep === RampSteps.ConnectWallet) {
      rampStepControlVar(RampSteps.ProcessingKyc)
      return
    }
  }, [address, currentStep])

  useEffect(() => {
    if (address) {
      changeWalletAddress()
    }
  }, [address])

  return (
    <Modal
      className={currentStep.toLowerCase()}
      title={title}
      isOpen={controlModal}
      onClose={clearRampVars}
      width={'auto'}
      showCloseIcon={currentStep !== RampSteps.Success}
      showHeader={![RampSteps.TimeOutCheckout, RampSteps.Error].includes(currentStep)}
    >
      <Container>{steps[currentStep]}</Container>
    </Modal>
  )
}

const { Container } = {
  Container: styled.div`
    width: auto;
    max-width: 420px;
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      min-width: 372px;
    }
  `
}
