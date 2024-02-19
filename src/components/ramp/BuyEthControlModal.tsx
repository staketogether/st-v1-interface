import Modal from '@/components/shared/Modal';
import { openModal, stepBuyCrypto } from '@/hooks/ramp/useControlModal';
import { useReactiveVar } from '@apollo/client';
import KycStep from './KycStep';
import QuotationStep from './QuotationStep';



export default function BuyEthControlModal() {


  const steps = {
    quotation: <QuotationStep />,
    checkout: <KycStep />
  }

  const controlModal = useReactiveVar(openModal)
  const currentStep = useReactiveVar(stepBuyCrypto)

  return (
    <Modal title={'Comprar ETH com PIX'} isOpen={controlModal} onClose={() => { openModal(false) }} width={'auto'}>
      {steps[currentStep]}
    </Modal>
  )
}
