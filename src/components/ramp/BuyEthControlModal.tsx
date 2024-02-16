import Modal from '@/components/shared/Modal'
import KycStep from './KycStep'
import QuotationStep from './QuotationStep'

export default function BuyEthControlModal() {
  const steps = {
    quotation: <QuotationStep />,
    checkout: <KycStep />
  }

  return (
    <Modal title={'Comprar ETH com PIX'} isOpen={true} onClose={() => { }} width={'auto'}>
      {steps.checkout}
    </Modal>
  )
}
