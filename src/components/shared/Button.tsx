import { ReactNode } from 'react'
import styled from 'styled-components'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'

interface ButtonProps {
  onClick?: () => void
  label: string
  type?: 'button' | 'submit'
  icon: ReactNode
  isLoading: boolean
  disabled?: boolean
}

export default function Button({ onClick, label, disabled, isLoading, icon, type }: ButtonProps) {
  const { t } = useLocaleTranslation()

  return (
    <Container disabled={disabled} {...(type && { type })} {...(onClick && { onClick })}>
      {icon}
      {isLoading ? t('processing') : label}
    </Container>
  )
}

const { Container } = {
  Container: styled.button`
    border: none;
    color: ${({ theme }) => theme.color.white};
    border-radius: ${props => props.theme.size[8]};
    background: ${({ theme }) => theme.color.primary};
    transition: background-color 0.2s ease;
    height: 48px;

    font-size: ${({ theme }) => theme.font.size[16]};

    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.size[8]};

    &:hover {
      background: ${({ theme }) => theme.color.secondary};
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }

    &.wrong {
      background-color: ${({ theme }) => theme.color.red[400]};
    }
  `
}
