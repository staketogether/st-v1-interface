import React from 'react'
import { PiWarning } from 'react-icons/pi'
import styled from 'styled-components'

interface AlertMessageComponentProps {
  message: string
}

export default function AlertMessageComponent({ message }: AlertMessageComponentProps) {
  return (
    <Container>
      <WarningIcon />
      <span>{message}</span>
    </Container>
  )
}

const { Container, WarningIcon } = {
  Container: styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 24px 1fr;
    gap: ${({ theme }) => theme.size[8]};

    border-radius: ${({ theme }) => theme.size[8]};
    align-items: start;
    background: ${({ theme }) => theme.colorV2.gray[2]};
    padding: ${({ theme }) => theme.size[16]};

    span {
      font-size: 13px;
      font-weight: 400;
    }
  `,
  WarningIcon: styled(PiWarning)`
    font-size: 24px;
  `
}
