import { BrlaBuyEthStep, openBrlaModalVar, stepsControlBuyCryptoVar } from '@/hooks/ramp/useControlModal'
import useTransak from '@/hooks/useTransak'
import CreditCard from '@assets/images/master-visa.svg'
import Pix from '@assets/images/pix-full.svg'
import Image from 'next/image'
import { useEffect } from 'react'
import styled from 'styled-components'
import Button from '../shared/Button'

export default function PaymentMethod() {
  const { onInit, isClosed } = useTransak({
    productsAvailed: 'BUY'
  })

  const handlePix = () => {
    stepsControlBuyCryptoVar(BrlaBuyEthStep.Quotation)
  }
  const handleCreditCard = () => {
    stepsControlBuyCryptoVar(BrlaBuyEthStep.MethodPayment)
    onInit()
  }

  useEffect(() => {
    if (isClosed) {
      openBrlaModalVar(false)
    }
  }, [isClosed])

  return (
    <Container>
      <Button
        title='Pix'
        height={56}
        padding='12px'
        type='button'
        onClick={handlePix}
        label='Pix'
        iconLeft
        block
        className='outline eachSide'
        color='gray'
        icon={<Image src={Pix} width={90} height={32} alt='' />}
      />
      <Button
        title='Cartão Crédito'
        height={56}
        padding='12px'
        onClick={handleCreditCard}
        label='Cartão Crédito'
        iconLeft
        block
        className='outline eachSide'
        color='gray'
        icon={<Image src={CreditCard} height={32} alt='' />}
      />
    </Container>
  )
}

const { Container } = {
  Container: styled.div`
    max-width: 372px;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
    img {
      mix-blend-mode: multiply;
    }
  `
}
