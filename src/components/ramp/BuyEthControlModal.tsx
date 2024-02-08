import Modal from '@/components/shared/Modal'
import React from 'react'
import QuotationStep from './QuotationStep'
import KycStep from './KycStep'

export default function BuyEthControlModal() {
  const steps = {
    quotation: <QuotationStep />,
    checkout: <KycStep />
  }

  return (
    <Modal title={'Comprar ETH com PIX'} isOpen={true} onClose={() => {}} width={'auto'}>
      {steps.checkout}
    </Modal>
  )
}
