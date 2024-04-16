import Modal from '@/components/shared/Modal'

import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { useReactiveVar } from '@apollo/client'

import { globalConfig } from '@/config/global'
import useEthBalanceOf from '@/hooks/contracts/useEthBalanceOf'
import {
  BrlaBuyEthStep,
  changeWalletAddress,
  clearModal,
  currentProductNameVar,
  openBrlaModalVar,
  stepsControlBuyCryptoVar
} from '@/hooks/ramp/useControlModal'
import axios from 'axios'
import { useEffect } from 'react'
import { SWRConfig } from 'swr'
import { useAccount } from 'wagmi'
import ConnectWallet from '../shared/ConnectWallet'
import CheckoutStep from './CheckoutStep'
import GenericErrorComponent from './GenericErrorComponent'
import KycStep from './KycStep'
import PaymentMethod from './PaymentMethod'
import ProcessingCheckoutStep from './ProcessingCheckoutStep'
import ProcessingKycStep from './ProcessingKycStep'
import QuotationStep from './QuotationStep'
import SuccessStep from './SuccessStep'
import { TimeOutCheckout } from './TimeOutCheckout'
import styled from 'styled-components'
import { getProductAssetByName } from '@/config/product-asset'
import QuotationOfRampStep from './QuotationOfRamp'

export default function BuyEthControlModal() {
  const { t } = useLocaleTranslation()
  const { address } = useAccount()
  const { refetch } = useEthBalanceOf({ walletAddress: address, chainId: 1 })
  const currentProductName = useReactiveVar(currentProductNameVar)
  const product = getProductAssetByName({ productName: currentProductName })

  const steps = {
    MethodPayment: <PaymentMethod product={product} />,
    Quotation: <QuotationStep product={product} />,
    QuotationOfRamp: <QuotationOfRampStep product={product} />,
    Kyc: <KycStep product={product} />,
    ConnectWallet: <ConnectWallet useModal />,
    ProcessingKyc: <ProcessingKycStep product={product} />,
    ProcessingCheckoutStep: <ProcessingCheckoutStep product={product} />,
    Checkout: <CheckoutStep product={product} />,
    TimeOutCheckout: <TimeOutCheckout asset={product} />,
    Success: <SuccessStep product={product} />,
    error: <GenericErrorComponent />
  }

  const controlModal = useReactiveVar(openBrlaModalVar)
  const currentStep = useReactiveVar(stepsControlBuyCryptoVar)
  const titleList: { [key: string]: string } = {
    Success: t('v2.ramp.success'),
    MethodPayment: t('v2.ramp.provider')
  }
  const title =
    currentStep in titleList ? titleList[currentStep] : t('v2.ramp.title').replace('symbol', product.symbol)
  const { backendUrl } = globalConfig

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
    <SWRConfig
      value={{
        refreshInterval: 0,
        revalidateOnMount: true,
        revalidateIfStale: true,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        errorRetryCount: 100,
        shouldRetryOnError: true,
        fetcher: (uri: string) =>
          axios.get(`${backendUrl}/${uri}`).then(res => {
            return res.data
          })
      }}
    >
      <Modal
        className={currentStep.toLowerCase()}
        title={title}
        isOpen={controlModal}
        onClose={clearModal}
        width={'auto'}
        showCloseIcon={currentStep !== BrlaBuyEthStep.Success}
        showHeader={![BrlaBuyEthStep.TimeOutCheckout, BrlaBuyEthStep.Error].includes(currentStep)}
      >
        <Container>{steps[currentStep]}</Container>
      </Modal>
    </SWRConfig>
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
