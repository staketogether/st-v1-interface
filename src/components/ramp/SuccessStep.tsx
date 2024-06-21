import { RampSteps, quoteVar, rampStepControlVar } from '@/hooks/ramp/useRampControlModal'
import { useFacebookPixel } from '@/hooks/useFacebookPixel'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { useReactiveVar } from '@apollo/client'
import successAnimation from '@assets/animations/success-animation.json'
import styled from 'styled-components'
import Button from '../shared/Button'
import LottieAnimation from '../shared/LottieAnimation'
import { Asset } from '@/types/Asset'

interface SuccessStepProps {
  asset?: Asset
  type: 'buy' | 'sell' | 'swap'
}

export default function SuccessStep({ asset, type }: SuccessStepProps) {
  const { t } = useLocaleTranslation()
  const quote = useReactiveVar(quoteVar)

  const exchange = (Number(quote?.amountBrl) / Number(quote?.amountToken)).toFixed(2)
  useFacebookPixel(`onramp-success:${asset?.name}`, !!quote, {
    amountToken: parseFloat(quote?.amountToken ?? '0'),
    amountFiat: parseFloat(quote?.amountBrl ?? '0'),
    method: 'PIX',
    assetId: `${asset?.name}`
  })

  const symbol = type === 'buy' ? asset?.symbol : 'BRL'
  const messageReceive =
    type === 'buy' ? t('v2.ramp.yourEths').replace('TOKENS', `${asset?.symbol}`) : t('v2.ramp.yourEths').replace('ETH', 'BRL')
  const value = type === 'buy' ? quote?.amountToken : quote?.amountBrl
  return (
    <Container>
      <LottieAnimation animationData={successAnimation} height={80} />
      <DepositToken>
        <div>
          <span>{`${value} ${symbol}`}</span>
        </div>
        <div>
          <span>{messageReceive}</span>
          <span className='purple'>{t('v2.ramp.timeReceive')}</span>
        </div>
      </DepositToken>
      <DepositInfo>
        <Info>
          <span>{t('v2.ramp.youReceived')}</span>
          <span className='right secondary'>
            {quote?.amountToken} {symbol}
          </span>
        </Info>
        <Info>
          <span>{t('v2.ramp.exchange')}</span>
          <div className='right'>
            <span className='green'>R$ {exchange}</span>
            <span>=</span>
            <span className='secondary'>1 {asset?.symbol}</span>
          </div>
        </Info>
        <Info>
          <div>
            <span className='green'>
              {quote?.amountToken} {asset?.symbol}
            </span>
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
      <Button
        type='button'
        label={t('close')}
        onClick={() => rampStepControlVar(type === 'buy' ? RampSteps.Quotation : RampSteps.QuotationOffRamp)}
      />
    </Container>
  )
}

const { Container, DepositToken, DepositInfo, Info } = {
  Container: styled.div`
    width: auto;
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
      &:nth-child(1) {
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
      &:nth-child(2) {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        flex-direction: column;
        gap: ${({ theme }) => theme.size[4]};
        > span {
          font-size: ${({ theme }) => theme.font.size[13]};
          font-weight: 400;
          line-height: 16px;
          letter-spacing: 0em;
          text-align: center;
          &.purple {
            color: ${({ theme }) => theme.colorV2.purple[1]};
            font-size: ${({ theme }) => theme.font.size[16]};
            font-weight: 500;
          }
        }
      }
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
