import Button from '@/components/shared/Button'
import React from 'react'
import { PiArrowDown, PiArrowRight, PiCaretDown, PiClock } from 'react-icons/pi'
import styled from 'styled-components'

export default function QuotationStep() {
  return (
    <Container>
      <header>Compre Ethereum direto via PIX:</header>
      <BoxValuesContainer>
        <InputContainer>
          <div>BRL</div>
          <input type='text' />
        </InputContainer>
        <ArrowDown />
        <InputContainer>
          <div>BRL</div>
          <input type='text' />
        </InputContainer>
      </BoxValuesContainer>
      <PriceInfoContainer>
        <span>
          Melhor preço: <span className='blue'>1 ETH = 9.117,67 BRL</span>
        </span>
        <span className='gray'>
          <PiClock style={{ fontSize: 16 }} /> <span>Preço atualiza em 5s</span>
        </span>
      </PriceInfoContainer>
      <DescriptionDetail>
        <span>Total</span>
        <div>
          <span>R$18.XXX,XX</span>
          <PiCaretDown />
        </div>
      </DescriptionDetail>
      <Button onClick={() => {}} label={'Continuar'} icon={<PiArrowRight />} />
      <footer>
        Ao continuar você concorda com nossas <a href='#'>políticas.</a>
      </footer>
    </Container>
  )
}

const { Container, DescriptionDetail, InputContainer, ArrowDown, BoxValuesContainer, PriceInfoContainer } = {
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
  `,
  DescriptionDetail: styled.div`
    width: 100%;
    padding: ${({ theme }) => theme.size[12]};

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;

    border-radius: ${({ theme }) => theme.size[8]};
    border: 1px solid ${({ theme }) => theme.colorV2.gray[6]};

    > div {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[8]};
    }
  `
}
