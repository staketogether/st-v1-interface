import Button from '@/components/shared/Button'
import { BrlaBuyEthStep, fiatAmountVar, stepsControlBuyCryptoVar } from '@/hooks/ramp/useControlModal'
import useKycLevelInfo from '@/hooks/ramp/useKycLevelInfo'
import useQuoteBrla from '@/hooks/ramp/useQuote'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { PaymentMethodType } from '@/types/payment-method.type'
import { ProviderType } from '@/types/provider.type'
import { useReactiveVar } from '@apollo/client'
import brlBrla from '@assets/icons/brl-brla.svg'
import eth from '@assets/icons/eth-icon.svg'
import { ethers } from 'ethers'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { PiArrowDown, PiArrowRight, PiClock } from 'react-icons/pi'

import styled from 'styled-components'
import { useAccount } from 'wagmi'

export default function QuotationStep() {
  const initialSeconds = 5
  const fiatAmount = useReactiveVar(fiatAmountVar)
  const [value, setValue] = useState<number | string>(fiatAmount ?? 0)
  const { quote, isValidating: quoteIsValidating } = useQuoteBrla(
    1,
    'brl',
    Number(value),
    0,
    ProviderType.brla,
    PaymentMethodType.pix
  )
  const { address } = useAccount()
  const { kycLevelInfo } = useKycLevelInfo('brla', address)
  const [seconds, setSeconds] = useState<number>(5)
  const [timerStarted, setTimerStarted] = useState<boolean>(false)
  const { t } = useLocaleTranslation()

  const limit = ethers.toBigInt(value ?? 0) > ethers.toBigInt(kycLevelInfo?.limits.limitSwapBuy ?? 0)
  const error = limit && !!kycLevelInfo?.limits.limitSwapBuy

  const handleChange = (amount: string) => {
    const regex = /^\d*\.?\d{0,2}$/
    const newValue = amount.replace(/\D/g, '')

    if (regex.test(newValue) && newValue !== '' && newValue !== '.') {
      setValue(newValue)
      fiatAmountVar(newValue)
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (timerStarted && seconds > 0) {
      timer = setTimeout(() => {
        setSeconds(seconds - 1)
      }, 1000)
    }
    return () => clearTimeout(timer)
  }, [timerStarted, seconds])

  useEffect(() => {
    if (!quoteIsValidating) {
      setSeconds(initialSeconds)
      setTimerStarted(true)
    }
  }, [quoteIsValidating])

  const handleNext = useCallback(() => {
    if (!kycLevelInfo?.level) {
      stepsControlBuyCryptoVar(BrlaBuyEthStep.Kyc)
      return
    }

    stepsControlBuyCryptoVar(BrlaBuyEthStep.ProcessingKyc)
  }, [kycLevelInfo?.level])

  return (
    <Container>
      <header>{t('v2.ramp.quote.title')}:</header>
      <BoxValuesContainer>
        <InputContainer className={`${error ? 'error' : ''}`}>
          <div>
            <Image src={brlBrla} width={36} height={24} alt='BRL' />
            <span>BRL</span>
          </div>
          <input
            type='number'
            onChange={({ target }) => handleChange(target.value)}
            value={value}
            min={0}
            step={1}
          />
        </InputContainer>
        <ArrowDown />
        <InputContainer>
          <div>
            <Image src={eth} width={36} height={24} alt='BRL' />
            <span>ETH</span>
          </div>
          <input type='number' value={quote?.amountToken ?? 0} disabled />
        </InputContainer>
      </BoxValuesContainer>
      <PriceInfoContainer>
        <span className='gray'>
          <PiClock style={{ fontSize: 16 }} />{' '}
          <span>
            {t('v2.ramp.quote.updateQuote')} {quote?.amountToken ? seconds : 5}s
          </span>
        </span>
      </PriceInfoContainer>
      <Button
        onClick={handleNext}
        disabled={Number(fiatAmount) <= 0 || error}
        label={t('next')}
        icon={<PiArrowRight />}
      />
      <footer>
        {t('v2.ramp.quote.terms')} <a href='#'>{t('v2.ramp.quote.policies')}.</a>
      </footer>
    </Container>
  )
}

const { Container, InputContainer, ArrowDown, BoxValuesContainer, PriceInfoContainer } = {
  Container: styled.div`
    width: auto;
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      min-width: 372px;
    }
    color: ${({ theme }) => theme.colorV2.gray[1]};

    > header {
      font-size: ${({ theme }) => theme.font.size[13]};
      font-weight: 400;
    }

    display: grid;
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.size[24]};

    > footer {
      font-size: 13px;
      color: ${({ theme }) => theme.colorV2.gray[1]};
      opacity: 0.6;
      text-align: center;
    }
  `,
  BoxValuesContainer: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};
    align-items: center;
  `,
  InputContainer: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.size[16]};

    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.colorV2.gray[2]};
    padding: ${({ theme }) => theme.size[8]};
    box-shadow: ${({ theme }) => theme.shadow[100]};

    font-weight: 500;

    border: 1px solid transparent;

    &.error {
      border: 1px solid ${({ theme }) => theme.color.red[300]};
    }

    > div {
      font-size: ${({ theme }) => theme.font.size[15]};
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    input {
      width: 50%;
      border: 0;
      background: transparent;
      font-size: ${({ theme }) => theme.font.size[22]};
      font-weight: 500;
      color: ${({ theme }) => theme.colorV2.gray[1]};
      text-align: right;
      &:focus {
        outline: none;
      }
    }
  `,
  ArrowDown: styled(PiArrowDown)`
    font-size: ${({ theme }) => theme.font.size[24]};
  `,
  PriceInfoContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[4]};
    text-align: center;

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
