import Modal from '@/components/shared/Modal'

import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { useReactiveVar } from '@apollo/client'

import {
  BrlaBuyEthStep,
  clearModal,
  openBrlaModalVar,
  stepsControlBuyCryptoVar
} from '@/hooks/ramp/useControlModal'
import CheckoutStep from './CheckoutStep'
import KycStep from './KycStep'
import PaymentMethod from './PaymentMethod'
import ProcessingCheckoutStep from './ProcessingCheckoutStep'
import ProcessingKycStep from './ProcessingKycStep'
import QuotationStep from './QuotationStep'
import SuccessStep from './SuccessStep'
import { SWRConfig } from 'swr'
import axios from 'axios'
import { globalConfig } from '@/config/global'

export default function BuyEthControlModal() {
  const { t } = useLocaleTranslation()

  const steps = {
    MethodPayment: <PaymentMethod />,
    Quotation: <QuotationStep />,
    Kyc: <KycStep />,
    ProcessingKyc: <ProcessingKycStep />,
    ProcessingCheckoutStep: <ProcessingCheckoutStep />,
    Checkout: <CheckoutStep />,
    Success: <SuccessStep />
  }

  const controlModal = useReactiveVar(openBrlaModalVar)
  const currentStep = useReactiveVar(stepsControlBuyCryptoVar)
  const titleList: { [key: string]: string } = {
    Success: t('v2.ramp.success'),
    MethodPayment: 'Provedores'
  }
  const title = currentStep in titleList ? titleList[currentStep] : t('v2.ramp.title')
  const { backendUrl } = globalConfig

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
      >
        {steps[currentStep]}
      </Modal>
    </SWRConfig>
  )
}
