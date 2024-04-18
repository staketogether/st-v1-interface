import { ReactNode } from 'react'
import styled from 'styled-components'

type CardProps = {
  children: ReactNode
  title?: string
  icon?: ReactNode
  header?: ReactNode
  className?: string
}

export default function Card({ children, title, icon, header, className }: CardProps) {
  return (
    <Container>
      {header ? (
        header
      ) : (
        <DefaultHeader>
          {icon}
          <span>{title}</span>
        </DefaultHeader>
      )}
      <WithdrawContainer className={className}>{children}</WithdrawContainer>
    </Container>
  )
}

const { Container, WithdrawContainer, DefaultHeader } = {
  Container: styled.div`
    background: ${({ theme }) => theme.colorV2.white};
    border-radius: 8px;
    box-shadow: ${({ theme }) => theme.shadow[100]};

    width: 100%;
    box-shadow: ${({ theme }) => theme.shadow[100]};

    display: flex;
    align-items: center;
    flex-direction: column;
    header {
      height: 48px;
      width: 100%;

      box-shadow: ${({ theme }) => theme.shadow[100]};
      border-bottom: 1px solid ${({ theme }) => theme.colorV2.gray[2]};
      border-radius: 8px 8px 0 0;

      font-weight: 400;
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.colorV2.gray[1]};
    }
  `,
  DefaultHeader: styled.header`
    display: flex;
    gap: ${({ theme }) => theme.size[8]};
    align-items: center;
    padding: 0px 12px;
  `,
  WithdrawContainer: styled.div`
    width: 100%;
    padding: 16px ${({ theme }) => theme.size[12]};
  `
}
