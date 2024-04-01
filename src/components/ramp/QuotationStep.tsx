import Button from '@/components/shared/Button'
import { BrlaBuyEthStep, depositConfigVar, fiatAmountVar, stepsControlBuyCryptoVar } from '@/hooks/ramp/useControlModal'
import useKycLevelInfo from '@/hooks/ramp/useKycLevelInfo'
import useQuoteBrla from '@/hooks/ramp/useQuote'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { PaymentMethodType } from '@/types/payment-method.type'
import { ProviderType } from '@/types/provider.type'
import { useReactiveVar } from '@apollo/client'
import brlBrla from '@assets/icons/brl-brla.svg'
import eth from '@assets/icons/eth-icon.svg'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { PiArrowDown, PiArrowRight, PiClock } from 'react-icons/pi'

import styled from 'styled-components'
import { useDebounce } from 'usehooks-ts'
import { useAccount } from 'wagmi'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import { KycLevel } from './KycLevel'

export default function QuotationStep() {
  const initialSeconds = 5
  const minValue = 100
  const fiatAmount = useReactiveVar(fiatAmountVar)
  const [value, setValue] = useState<number | string>(fiatAmount ?? 0)
  const [activeValue, setActiveValue] = useState<number>(0)
  const debounceValue = useDebounce(value, 300)
  const depositConfig = useReactiveVar(depositConfigVar)


  const { quote, isValidating: quoteIsValidating } = useQuoteBrla(
    'brl',
    debounceValue ? Number(debounceValue) : 0,
    depositConfig?.depositChanId,
    0,
    ProviderType.brla,
    PaymentMethodType.pix,
    depositConfig?.toChain,
    depositConfig?.toToken
  )
  const { address } = useAccount()
  const { kycLevelInfo } = useKycLevelInfo('brla', address)
  const [seconds, setSeconds] = useState<number>(5)
  const [timerStarted, setTimerStarted] = useState<boolean>(false)
  const { t } = useLocaleTranslation()
  const limit = Number(debounceValue) * 100 >= Number(kycLevelInfo?.limits.limitSwapBuy ?? 0)
  const error = limit && !!kycLevelInfo?.limits.limitSwapBuy
  const errorMinValue = BigInt(debounceValue) < minValue
  const handleChange = (value: string) => {
    if (value.includes(',')) {
      value = value.replace(',', '.')
    }
    const regex = /^(\d+(\.\d*)?|\.\d+)$/
    if (!value || regex.test(value)) {
      if (value.length > 19 + value.split('.')[0].length) return

      setValue(value)
      fiatAmountVar(value)
    }
  }
  useMemo(() => {

    if (quote?.amountBrl && quote?.amountToken) {
      const value = Number(quote.amountBrl) / Number(quote.amountToken)
      setActiveValue(value)
    }
  }, [quote])

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
    if (!address) {
      stepsControlBuyCryptoVar(BrlaBuyEthStep.ConnectWallet)
      return
    }

    if (!kycLevelInfo?.level) {
      stepsControlBuyCryptoVar(BrlaBuyEthStep.Kyc)
      return
    }


    stepsControlBuyCryptoVar(BrlaBuyEthStep.ProcessingKyc)
  }, [address, kycLevelInfo?.level])


  const handleLabelButton = () => {

    if (error) {
      return `${t('v2.stake.depositErrorMessage.DepositLimitReached')}`
    }

    if (BigInt(debounceValue) < minValue) {
      return `${t('v2.stake.minAmount')} R$${minValue}`
    }

    return t('next')
  }

  return (
    <Container>
      <KycLevel amountValue={Number(debounceValue)} />
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
            placeholder='0'
            step={1}
          />
        </InputContainer>
        <ArrowDown />
        <InputContainer>
          <div>
            <Image src={eth} width={36} height={24} alt='BRL' />
            <span>ETH</span>
          </div>
          {quoteIsValidating ? <SkeletonLoading width={60} height={20} /> : <input value={quote?.amountToken} disabled placeholder='0' />}
        </InputContainer>
      </BoxValuesContainer>
      <PriceInfoContainer>
        <div>
          <span>{t('v2.ramp.quote.price')}</span>
          <span>1 ETH = {activeValue.toLocaleString('pt-BR')} BRL</span>
        </div>
        <span className='gray'>
          <PiClock style={{ fontSize: 16 }} />{' '}
          <span>
            {t('v2.ramp.quote.updateQuote')} {quote?.amountToken ? seconds : 5}s
          </span>
        </span>
      </PriceInfoContainer>
      <Button
        onClick={handleNext}
        disabled={BigInt(debounceValue) < minValue || error || quoteIsValidating || !quote?.amountBrl}
        label={handleLabelButton()}
        icon={!error && !errorMinValue && <PiArrowRight />}
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
    height: 45px;
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
