import useQuoteBrla from '@/hooks/ramp/useQuote'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { ProductAsset } from '@/types/ProductAsset'
import { PaymentMethodType } from '@/types/payment-method.type'
import { ProviderType } from '@/types/provider.type'
import { useEffect, useMemo, useState } from 'react'
import { PiClock } from 'react-icons/pi'
import styled from 'styled-components'

type QuotationStepEthAmountProps = {
  product: ProductAsset
}

export default function QuotationStepEthAmount({ product }: QuotationStepEthAmountProps) {
  const initialSeconds = 5

  const [seconds, setSeconds] = useState<number>(5)
  const [timerStarted, setTimerStarted] = useState<boolean>(false)
  const [activeValue, setActiveValue] = useState<number>(0)
  const [amount, setAmount] = useState<number>(300)

  // Quote ETH amount separately. Today we quote on Ethereum chain directly because both products are on Ethereum.
  // In the future, we will quote on the chain of the product and need to treat ethereum restaking separately.
  const { t } = useLocaleTranslation()
  const { quote: quoteEthValue, isValidating: ethValueIsValidating } = useQuoteBrla(
    'brl',
    amount,
    product.ramp.bridge?.fromChainId || product.ramp.chainId,
    0,
    ProviderType.brla,
    PaymentMethodType.pix,
    `${product.ramp.bridge?.toChainId}`,
    product.ramp.bridge?.toToken,
    false
  )

  useMemo(() => {
    if (quoteEthValue?.amountBrl && quoteEthValue?.amountToken) {
      const value = Number(quoteEthValue.amountBrl) / Number(quoteEthValue.amountToken)
      setActiveValue(value)
    }
  }, [quoteEthValue])

  useEffect(() => {
    if (!ethValueIsValidating) {
      setSeconds(initialSeconds)
      setTimerStarted(true)
    }
  }, [ethValueIsValidating])

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (timerStarted && seconds === 0) {
      setAmount(amount + 1)
      setSeconds(initialSeconds)
    }

    if (timerStarted && seconds > 0) {
      timer = setTimeout(() => {
        setSeconds(seconds - 1)
      }, 1000)
    }

    return () => clearTimeout(timer)
  }, [timerStarted, seconds, amount])

  return (
    <PriceInfoContainer>
      <div>
        <span>{t('v2.ramp.quote.price')}</span>
        <span>
          1 {product.symbol} = {activeValue.toLocaleString('pt-BR')} BRL
        </span>
      </div>
      <span className='gray'>
        <PiClock style={{ fontSize: 16 }} />{' '}
        <span>
          {t('v2.ramp.quote.updateQuote')} {quoteEthValue?.amountToken ? seconds : 5}s
        </span>
      </span>
    </PriceInfoContainer>
  )
}

const { PriceInfoContainer } = {
  PriceInfoContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[4]};
    text-align: center;
    > div {
      display: flex;
      flex-direction: row;
      gap: 2px;
      justify-content: center;
      > span:first-child {
        font-size: 13px;
        font-weight: 400;
        line-height: 16px;
        letter-spacing: 0em;
        text-align: left;
      }
      > span:last-child {
        font-size: 15px;
        font-weight: 500;
        line-height: 18px;
        letter-spacing: 0em;
        text-align: left;
        color: ${({ theme }) => theme.colorV2.blue[3]};
      }
    }
    span {
      font-size: ${({ theme }) => theme.font.size[13]};
      font-weight: 400;
      &.gray {
        opacity: 0.6;
        font-weight: 400;

        display: flex;
        align-items: center;
        justify-content: center;
        gap: ${({ theme }) => theme.size[4]};
      }
      > span {
        &.blue {
          font-size: ${({ theme }) => theme.font.size[15]};
          font-weight: 500;
          color: ${({ theme }) => theme.colorV2.blue[1]};
        }
      }
    }
  `
}
