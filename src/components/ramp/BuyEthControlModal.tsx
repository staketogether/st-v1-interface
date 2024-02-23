import Modal from '@/components/shared/Modal';
import { BrlaBuyEthStep, openModal, stepsControlBuyCrypto } from '@/hooks/ramp/useControlModal';
import useLocaleTranslation from '@/hooks/useLocaleTranslation';
import { useReactiveVar } from '@apollo/client';
import CheckoutStep from './CheckoutStep';
import KycStep from './KycStep';
import ProcessingCheckoutStep from './ProcessingCheckoutStep';
import ProcessingKycStep from './ProcessingKycStep';
import QuotationStep from './QuotationStep';
import SuccessStep from './SuccessStep';

export default function BuyEthControlModal() {
  const { t } = useLocaleTranslation()

  const steps = {
    Quotation: <QuotationStep />,
    Kyc: <KycStep />,
    ProcessingKyc: <ProcessingKycStep />,
    ProcessingCheckoutStep: <ProcessingCheckoutStep />,
    Checkout: <CheckoutStep />,
    Success: <SuccessStep />
  }

  const controlModal = useReactiveVar(openModal)
  const currentStep = useReactiveVar(stepsControlBuyCrypto)
  const title = currentStep === BrlaBuyEthStep.Success ? t('v2.ramp.success') : t('v2.ramp.title')

  return (
    <Modal
      className={currentStep.toLowerCase()}
      title={title}
      isOpen={controlModal}
      onClose={() => { openModal(false) }}
      width={'auto'}
      showCloseIcon={currentStep !== BrlaBuyEthStep.Success}>
      {steps[currentStep]}
    </Modal>
  )
}
