import React, { ReactNode } from 'react'
import { PiWarning } from 'react-icons/pi'
import styled from 'styled-components'

interface AlertMessageComponentProps {
  message: string,
  header?: ReactNode,
}

export default function AlertMessageComponent({ message, header }: AlertMessageComponentProps) {

  return (
    <Container>
      {header}
      <MessageContainer>
        <WarningIcon />
        <span>{message}</span>
      </MessageContainer>
    </Container>
  )
}

const { Container, WarningIcon, MessageContainer } = {
  Container: styled.div`
    width: 100%;
    border-radius: ${({ theme }) => theme.size[8]};
    align-items: start;
    background: ${({ theme }) => theme.colorV2.gray[2]};
    padding: ${({ theme }) => theme.size[16]};

    span {
      font-size: 13px;
      font-weight: 400;
      color: ${({ theme }) => theme.color.gray[800]};
      line-height: 14px;
    }
  `,
  WarningIcon: styled(PiWarning)`
    font-size: 24px;
  `, 
  MessageContainer: styled.div`
        display: grid;
        grid-template-columns: 24px 1fr;
        gap: ${({ theme }) => theme.size[8]};
  `
}