import processing from '@assets/images/processing.svg';
import Image from 'next/image';
import { PiCircleLight, PiClockLight } from 'react-icons/pi';
import styled, { useTheme } from "styled-components";
import SwapInfo from './SwapInfo';
import ValidationList from './ValidationList';

export default function ProcessingKycStep() {

  const theme = useTheme()
  const validationSteps = [
    {
      icon: <PiClockLight size={32} color={theme.color.secondary} />,
      text: 'Processando Cadastro',
      disable: false
    },
    {
      icon: <PiCircleLight size={32} color={theme.color.secondary} />,
      text: 'Gerando QR Code',
      disable: true
    }
  ]

  return (
    <Container>
      <Header>
        <Image src={processing} width={80} alt='processing' />
        <span>Processando Cadastro</span>
      </Header>
      <SwapInfo />
      <ValidationList validationSteps={validationSteps} />
    </Container>
  )
}

const { Container, Header } = {
  Container: styled.div`
    width: 420px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  `,
  Header: styled.div`
    display: flex;
    gap: ${({ theme }) => theme.size[12]};
    flex-direction: column;
    align-items: center;
    > img {
      width: 80px;
    };
    > span {
      font-size: 18px;
      font-weight: 500;
      line-height: 22px;
      letter-spacing: 0em;
      text-align: left;
    }
  `
}
