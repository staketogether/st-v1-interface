import { Asset } from '@/types/Asset'
import loadingAnimation from '@assets/animations/loading-animation.json'
import styled from 'styled-components'
import LottieAnimation from '../shared/LottieAnimation'
import SwapInfo from './SwapInfo'
import ValidationList, { ValidationSteps } from './ValidationList'

export default function WrapProcessingStep({
  validationSteps,
  title,
  asset,
  type
}: {
  validationSteps: ValidationSteps[]
  title: string
  asset: Asset
  type: 'buy' | 'sell' | 'swap'
}) {
  return (
    <Container>
      <Header>
        <LottieAnimation animationData={loadingAnimation} height={80} loop />
        <span>{title}</span>
      </Header>
      <SwapInfo asset={asset} type={type} />
      <ValidationList validationSteps={validationSteps} />
    </Container>
  )
}

const { Container, Header } = {
  Container: styled.div`
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
