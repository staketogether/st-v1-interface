import { chainConfigByChainId } from '@/config/chain'
import { RampSteps, openBrlaModalVar, rampStepControlVar } from '@/hooks/ramp/useControlModal'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import useTransak from '@/hooks/useTransak'
import { Asset } from '@/types/Asset'
import CreditCard from '@assets/images/master-visa.svg'
import Pix from '@assets/images/pix-full.svg'
import Image from 'next/image'
import { useEffect } from 'react'
import styled from 'styled-components'
import Button from '../shared/Button'

interface PaymentMethodProps {
  asset: Asset
}

export default function PaymentMethod({ asset }: PaymentMethodProps) {
  const [networkAvailable] = asset.chains
  const chain = chainConfigByChainId(networkAvailable)
  const { t } = useLocaleTranslation()
  const { onInit, isClosed } = useTransak({
    productsAvailed: 'BUY',
    network: chain.name
  })

  const handlePix = () => {
    rampStepControlVar(RampSteps.Quotation)
  }
  const handleCreditCard = () => {
    rampStepControlVar(RampSteps.MethodPayment)
    onInit()
  }

  useEffect(() => {
    if (isClosed) {
      openBrlaModalVar(false)
    }
  }, [isClosed])

  if (asset.symbol === 'wBtc') {
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
