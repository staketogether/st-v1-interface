import React from 'react'
import styled from 'styled-components'
import ConnectWallet from '../shared/ConnectWallet'

export default function ProjectLogin() {
  return (
    <Container>
      <span>A carteira que voce conectar sera usada para registrar o projeto</span>
      <ConnectWallet />
    </Container>
  )
}

const { Container } = {
  Container: styled.div`
    display: grid;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
    span {
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.colorV2.gray[1]};
    }
  `
}
