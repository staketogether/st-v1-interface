import Modal from '@/components/shared/Modal';
import { StepBuyEth, openModal, stepBuyCrypto } from '@/hooks/ramp/useControlModal';
import { useReactiveVar } from '@apollo/client';
import CheckoutStep from './CheckoutStep';
import KycStep from './KycStep';
import ProcessingCheckoutStep from './ProcessingCheckoutStep';
import ProcessingKycStep from './ProcessingKycStep';
import QuotationStep from './QuotationStep';
import SuccessStep from './SuccessStep';



export default function BuyEthControlModal() {


  const steps = {
    Quotation: <QuotationStep />,
    KycStep: <KycStep />,
    ProcessingKyc: <ProcessingKycStep />,
    ProcessingCheckoutStep: <ProcessingCheckoutStep />,
    Checkout: <CheckoutStep />,
    Success: <SuccessStep />
  }

  const controlModal = useReactiveVar(openModal)
  const currentStep = useReactiveVar(stepBuyCrypto)
  const title = currentStep === StepBuyEth.Success ? 'Deposito concluido com sucesso!' : 'Comprar ETH com PIX'

  return (
    <Modal
      className={currentStep.toLowerCase()}
      title={title}
      isOpen={controlModal}
      onClose={() => { openModal(false) }}
      width={'auto'}
      showCloseIcon={currentStep !== StepBuyEth.Success}>
      {steps[currentStep]}
    </Modal>
  )
}
