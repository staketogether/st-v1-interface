import Modal from '@/components/shared/Modal'
import React from 'react'
import QuotationStep from './QuotationStep'
import CheckoutStep from './CheckoutStep'

export default function BuyEthControlModal() {
  const steps = {
    quotation: <QuotationStep />,
    checkout: <CheckoutStep />
  }

  return (
    <Modal title={'Comprar ETH com PIX'} isOpen={true} onClose={() => {}} width={'auto'}>
      {steps.checkout}
    </Modal>
  )
}
