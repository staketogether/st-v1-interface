import styled from 'styled-components'
import SwapInfo from './SwapInfo'
import ValidationList, { ValidationSteps } from './ValidationList'
import loadingAnimation from '@assets/animations/loading-animation.json'
import LottieAnimation from '../shared/LottieAnimation'

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
    max-width: 372px;
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
