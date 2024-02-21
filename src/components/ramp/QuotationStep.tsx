import Button from '@/components/shared/Button';
import { StepBuyEth, amountValue, stepBuyCrypto } from '@/hooks/ramp/useControlModal';
import useQuoteBrla from '@/hooks/ramp/useQuote';
import useLocaleTranslation from '@/hooks/useLocaleTranslation';
import { PaymentMethodType } from '@/types/payment-method.type';
import { ProviderType } from '@/types/provider.type';
import brlBrla from '@assets/icons/brl-brla.svg';
import eth from '@assets/icons/eth-icon.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { PiArrowDown, PiArrowRight, PiClock } from 'react-icons/pi';

import styled from 'styled-components';

export default function QuotationStep() {

  const initialSeconds = 5;
  const [value, setValue] = useState<number | string>(0);
  const { quote } = useQuoteBrla(1, 'brl', Number(value), 0, ProviderType.brla, PaymentMethodType.pix)
  const [seconds, setSeconds] = useState<number>(5);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const { t } = useLocaleTranslation()


  const handleChange = (amount: string) => {

    const regex = /^\d*\.?\d{0,2}$/;
    const newValue = amount;


    if (regex.test(newValue) || newValue === '' || newValue === '.') {
      setValue(newValue);
      amountValue(newValue)
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerStarted && seconds > 0) {
      timer = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [timerStarted, seconds]);

  useEffect(() => {
    if (quote) {
      setSeconds(initialSeconds);
      setTimerStarted(false);
      setTimerStarted(true);
    }
  }, [quote])
  return (
    <Container>
      <header>{t('v2.ramp.quote.title')}:</header>
      <BoxValuesContainer>
        <InputContainer>
          <div>
            <Image src={brlBrla} width={36} height={24} alt='BRL' />
            <span>BRL</span>
          </div>
          <input type='text' onChange={(({ target }) => handleChange(target.value))} value={value} />
        </InputContainer>
        <ArrowDown />
        <InputContainer>
          <div>
            <Image src={eth} width={36} height={24} alt='BRL' />
            <span>ETH</span>
          </div>
          <input type='text' value={quote?.amountCrypto ?? 0} disabled />
        </InputContainer>
      </BoxValuesContainer>
      <PriceInfoContainer>
        <span className='gray'>
          <PiClock style={{ fontSize: 16 }} /> <span>{t('v2.ramp.quote.updateQuote')} {quote?.amountCrypto ? seconds : 5}s</span>
        </span>
      </PriceInfoContainer>
      <Button onClick={() => { stepBuyCrypto(StepBuyEth.KycStep) }} label={t('next')} icon={<PiArrowRight />} />
      <footer>
        {t('v2.ramp.quote.terms')} <a href='#'>{t('v2.ramp.quote.policies')}.</a>
      </footer>
    </Container>
  )
}

const { Container, InputContainer, ArrowDown, BoxValuesContainer, PriceInfoContainer } = {
  Container: styled.div`
    width: 372px;
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
