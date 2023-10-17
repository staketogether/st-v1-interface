import { ButtonHTMLAttributes, ReactNode } from 'react'
import styled from 'styled-components'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void
  label?: string
  icon: ReactNode
  isLoading: boolean
  disabled?: boolean
  small?: boolean
  block?: boolean
}

export default function Button({
  onClick,
  label,
  disabled,
  isLoading,
  icon,
  small = false,
  block = false,
  children,
  ...props
}: ButtonProps) {
  const { t } = useLocaleTranslation()

  return (
    <Container
      {...props}
      onClick={onClick}
      disabled={disabled}
      className={`${small && 'small'} ${block && 'block'}`}
    >
      {icon}
      {isLoading ? t('processing') : label || children}
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
    padding: 0px 16px;

    font-size: ${({ theme }) => theme.font.size[16]};

    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.size[8]};

    &.small {
      height: 32px;
      padding: 0px 12px;
      font-size: ${({ theme }) => theme.font.size[14]};
    }

    &.block {
      width: 100%;
    }

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
