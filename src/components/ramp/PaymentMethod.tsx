import { BrlaBuyEthStep, openBrlaModalVar, stepsControlBuyCryptoVar } from '@/hooks/ramp/useControlModal'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import useTransak from '@/hooks/useTransak'
import CreditCard from '@assets/images/master-visa.svg'
import Pix from '@assets/images/pix-full.svg'
import Image from 'next/image'
import { useEffect } from 'react'
import styled from 'styled-components'
import Button from '../shared/Button'
import { ProductAsset } from '@/types/ProductAsset'

type PaymentMethodProps = {
  product: ProductAsset
}

export default function PaymentMethod({ product }: PaymentMethodProps) {
  const { t } = useLocaleTranslation()
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

  const isBtc = product.symbol === 'wBTC'
  if (isBtc) {
    handlePix()
  }

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
        title={t('v2.ramp.creditCard')}
        height={56}
        padding='12px'
        onClick={handleCreditCard}
        label={t('v2.ramp.creditCard')}
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
    width: auto;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
    img {
      mix-blend-mode: multiply;
    }
  `
}
