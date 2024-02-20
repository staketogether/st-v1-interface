import Modal from '@/components/shared/Modal';
import { openModal, stepBuyCrypto } from '@/hooks/ramp/useControlModal';
import { useReactiveVar } from '@apollo/client';
import CheckoutStep from './CheckoutStep';
import KycStep from './KycStep';
import ProcessingCheckoutStep from './ProcessingCheckoutStep';
import ProcessingKycStep from './ProcessingKycStep';
import QuotationStep from './QuotationStep';



export default function BuyEthControlModal() {


  const steps = {
    Quotation: <QuotationStep />,
    KycStep: <KycStep />,
    ProcessingKyc: <ProcessingKycStep />,
    ProcessingCheckoutStep: <ProcessingCheckoutStep />,
    Checkout: <CheckoutStep />

  }

  const controlModal = useReactiveVar(openModal)
  const currentStep = useReactiveVar(stepBuyCrypto)

  return (
    <Modal title={'Comprar ETH com PIX'} isOpen={controlModal} onClose={() => { openModal(false) }} width={'auto'}>
      {steps[currentStep]}
    </Modal>
  )
}
