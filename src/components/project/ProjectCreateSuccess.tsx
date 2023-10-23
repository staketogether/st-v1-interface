import React from 'react'
import styled from 'styled-components'
import successAnimation from '@assets/animations/success-animation.json'
import LottieAnimation from '../shared/LottieAnimation'

export default function ProjectCreateSuccess() {
  return (
    <Container>
      <div>
        <LottieAnimation animationData={successAnimation} height={60} />
        <div>
          <h2>Projeto Cadastrado com sucesso!</h2>
          <span>Seu projeto esta sobre analise você tera uma resposta em alguns dias!</span>
        </div>
      </div>
    </Container>
  )
}

const { Container } = {
  Container: styled.div`
    width: 100%;
    display: grid;
    place-items: center;
    padding-bottom: 24px;

    > div {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[24]};
      > div {
        display: flex;
        flex-direction: column;
        gap: ${({ theme }) => theme.size[12]};
        text-align: center;
        h2 {
          font-size: ${({ theme }) => theme.font.size[18]};
          color: ${({ theme }) => theme.color.primary};
          font-weight: 500;
        }
        span {
          font-size: ${({ theme }) => theme.font.size[14]};
          color: ${({ theme }) => theme.color.secondary};
          font-weight: 500;
        }
      }
    }
  `
}
