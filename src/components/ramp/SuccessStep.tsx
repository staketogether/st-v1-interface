import { clearModal, quoteVar } from '@/hooks/ramp/useControlModal'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { useReactiveVar } from '@apollo/client'
import styled from 'styled-components'
import Button from '../shared/Button'
import LottieAnimation from '../shared/LottieAnimation'
import successAnimation from '@assets/animations/success-animation.json'

export default function SuccessStep() {
  const { t } = useLocaleTranslation()
  const quote = useReactiveVar(quoteVar)

  const exchange = (Number(quote?.amountBrl) / Number(quote?.amountToken)).toFixed(2)
  return (
    <Container>
      <LottieAnimation animationData={successAnimation} height={80} />
      <DepositToken>
        <div>
          <span>{quote?.amountToken} ETH</span>
        </div>
        <span>{t('v2.ramp.yourEths')}</span>
      </DepositToken>
      <DepositInfo>
        <Info>
          <span>{t('v2.ramp.youReceived')}</span>
          <span className='right secondary'>{quote?.amountToken} ETH</span>
        </Info>
        <Info>
          <span>{t('v2.ramp.exchange')}</span>
          <div className='right'>
            <span className='green'>R$ {exchange}</span>
            <span>=</span>
            <span className='secondary'>1 ETH</span>
          </div>
        </Info>
        <Info>
          <div>
            <span className='green'>{quote?.amountToken} ETH</span>
            <span>x</span>
            <span className='secondary'>R$ {exchange}</span>
          </div>
          <span className='right'>R$ {(Number(quote?.amountToken) * Number(exchange)).toFixed(2)}</span>
        </Info>
        <Info>
          <span>{t('v2.ramp.networkFee')}</span>
          <span className='right grayLight'>{quote?.gasFee} ETH</span>
        </Info>
        <Info>
          <span>{t('v2.ramp.serviceCharge')}</span>
          <span className='right grayLight'>R$ {quote?.markupFee ? Number(quote?.markupFee) / 100 : 0}</span>
        </Info>
        <Info>
          <span className='bold'>Total</span>
          <span className='right bold'>{quote?.amountToken} ETH</span>
        </Info>
      </DepositInfo>
      <Button type='button' label={t('close')} onClick={() => clearModal()} />
    </Container>
  )
}

const { Container, DepositToken, DepositInfo, Info } = {
  Container: styled.div`
    width: auto;
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      min-width: 372px;
    }
    display: flex;
    flex-direction: column;
    gap: ${({ theme: { size } }) => size[24]};
    > svg {
      margin: 0 auto;
    }
  `,
  DepositToken: styled.div`
    display: flex;
    flex-direction: column;
    padding: ${({ theme: { size } }) => size[24]};
    border-radius: ${({ theme: { size } }) => size[8]};
    border: 1px;
    gap: ${({ theme: { size } }) => size[8]};
    width: 100%;
    border: 1px solid ${({ theme }) => theme.colorV2.gray[6]};

    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      > span {
        font-size: ${({ theme }) => theme.font.size[22]};
        font-weight: 500;
        line-height: 27px;
        letter-spacing: 0em;
        text-align: center;
      }
    }
    > span {
      font-size: ${({ theme }) => theme.font.size[13]};
      font-weight: 400;
      line-height: 16px;
      letter-spacing: 0em;
      text-align: center;
    }
  `,
  DepositInfo: styled.div`
    //styleName: text 13;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};
    font-size: ${({ theme }) => theme.font.size[13]};
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
  `,
  Info: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

    > span,
    div {
      &.right {
        margin: 0 0 0 auto;
      }
    }

    .secondary {
      color: ${({ theme: { color } }) => color.primary};
      font-weight: 500;
    }
    .green {
      color: ${({ theme: { color } }) => color.green[500]};
      font-weight: 500;
    }
    .bold {
      font-weight: 500;
    }
  `
}
