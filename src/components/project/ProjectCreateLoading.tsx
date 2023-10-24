import React from 'react'
import styled from 'styled-components'
import loadingAnimation from '@assets/animations/loading-animation.json'
import LottieAnimation from '../shared/LottieAnimation'

export default function ProjectCreateLoading() {
  return (
    <Container>
      <div>
        <LottieAnimation animationData={loadingAnimation} height={60} loop />
        <h2>criando seu projeto</h2>
      </div>
    </Container>
  )
}

const { Container } = {
  Container: styled.div`
    width: 100%;
    display: grid;
    place-items: center;

    > div {
      h2 {
        font-size: ${({ theme }) => theme.font.size[18]};
        color: ${({ theme }) => theme.color.primary};
        font-weight: 500;
      }
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[24]};
    }
  `
}
