import loadingAnimation from '@assets/animations/loading-animation.json'
import styled from 'styled-components'
import LottieAnimation from '../shared/LottieAnimation'
import SwapInfo from './SwapInfo'
import ValidationList, { ValidationSteps } from './ValidationList'

export default function WrapProcessingStep({
  validationSteps,
  title
}: {
  validationSteps: ValidationSteps[]
  title: string
}) {
  return (
    <Container>
      <Header>
        <LottieAnimation animationData={loadingAnimation} height={80} loop />
        <span>{title}</span>
      </Header>
      <SwapInfo />
      <ValidationList validationSteps={validationSteps} />
    </Container>
  )
}

const { Container, Header } = {
  Container: styled.div`
    min-width:320px;
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      min-width: 372px;
    }
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
  `,
  Header: styled.div`
    display: flex;
    gap: ${({ theme }) => theme.size[12]};
    flex-direction: column;
    align-items: center;
    > img {
      width: 80px;
    }
    > span {
      font-size: ${({ theme }) => theme.font.size[18]};
      font-weight: 500;
      line-height: 22px;
      letter-spacing: 0em;
      text-align: left;
      color: ${({ theme: { color } }) => color.primary};
    }
  `
}
