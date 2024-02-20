import line from '@assets/icons/line.svg';
import processing from '@assets/images/processing.svg';
import Image from 'next/image';
import { PiClockLight } from 'react-icons/pi';
import styled, { useTheme } from "styled-components";
import SwapInfo from './SwapInfo';

export default function ProcessingKycStep() {

  const theme = useTheme()
  return (
    <Container>
      <Header>
        <Image src={processing} width={80} alt='processing' />
        <span>Processando Cadastro</span>
      </Header>
      <SwapInfo />
      <StatusContainer>
        <Status>
          <PiClockLight size={32} color={theme.color.secondary} />
          <span>Validando KYC</span>
        </Status>
        <Divider>
          <Image src={line} alt='' width={0} height={17} />
        </Divider>
        <Status className='disabled'>
          <PiClockLight size={32} color={theme.color.secondary} />
          <span>Validando KYC</span>
        </Status>
      </StatusContainer>
    </Container>
  )
}

const { Container, Header, StatusContainer, Status, Divider } = {
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
  `,
  StatusContainer: styled.div`
    display: grid;
    gap: ${({ theme }) => theme.size[4]};
    padding: ${({ theme }) => theme.size[24]};
    padding: ${({ theme }) => theme.size[24]};
    border: 1px solid ${({ theme }) => theme.colorV2.gray[6]};
    border-radius: ${({ theme }) => theme.size[8]};
  
  `,
  Status: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
      > span {
        font-size: 15px;
        font-weight: 500;
        line-height: 18px;
        letter-spacing: 0em;
        text-align: left;
      }
    &.disabled {
      filter: grayscale(1);
    }
  `,
  Divider: styled.div`
    margin-left: 16px;
  `
}
