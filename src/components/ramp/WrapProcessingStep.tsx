import styled from 'styled-components'
import SwapInfo from './SwapInfo'
import ValidationList, { ValidationSteps } from './ValidationList'
import loadingAnimation from '@assets/animations/loading-animation.json'
import LottieAnimation from '@/components/shared/LottieAnimation'
import React from 'react'

export default function WrapProcessingStep({ validationSteps, title }: { validationSteps: ValidationSteps[], title: string }) {
  return (
    <Container>
      <Header>
        <LottieAnimation animationData={loadingAnimation} height={60} loop />
        <span>{title}</span>
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
      color: ${({ theme: { color } }) => color.primary};
    }
  `
}
