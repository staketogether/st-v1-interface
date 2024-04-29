import useQuoteBrla from '@/hooks/ramp/useQuote'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { Asset } from '@/types/Asset'
import { PaymentMethodType } from '@/types/payment-method.type'
import { ProviderType } from '@/types/provider.type'
import { useEffect, useMemo, useState } from 'react'
import { PiClock } from 'react-icons/pi'
import styled from 'styled-components'
import SkeletonLoading from '../shared/icons/SkeletonLoading'

interface QuotationStepEthAmountProps {
  product: Asset
}

export default function QuotationStepEthAmount({ product }: QuotationStepEthAmountProps) {
  const initialSeconds = 5

  const [seconds, setSeconds] = useState<number>(5)
  const [timerStarted, setTimerStarted] = useState<boolean>(false)
  const [activeValue, setActiveValue] = useState<number>(0)
  const amount = 300

  // Quote ETH amount separately. Today we quote on Ethereum chain directly because both products are on Ethereum.
  // In the future, we will quote on the chain of the product and need to treat ethereum restaking separately.
  const { t } = useLocaleTranslation()
  const {
    quote: quoteEthValue,
    isValidating: ethValueIsValidating,
<<<<<<< HEAD
    isLoading,
    mutate
=======
    isLoading
>>>>>>> origin/dev
  } = useQuoteBrla(
    'brl',
    amount,
    product.ramp[0].bridge?.fromChainId ?? product.ramp[0].chainId,
    0,
    ProviderType.brla,
    PaymentMethodType.pix,
    `${product.ramp[0].bridge?.toChainId}`,
    product.ramp[0].bridge?.toToken,
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
      mutate()
      setSeconds(initialSeconds)
    }

    if (timerStarted && seconds > 0) {
      timer = setTimeout(() => {
        setSeconds(seconds - 1)
      }, 1000)
    }

    return () => clearTimeout(timer)
  }, [timerStarted, seconds, amount, mutate])

  return (
    <PriceInfoContainer>
      <div>
        <span>
          1 {product.symbol} = {isLoading ? <SkeletonLoading height={18} width={80} /> : activeValue.toLocaleString('pt-BR')} BRL
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

        display: flex;
        align-items: center;
        gap: 4px;
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
