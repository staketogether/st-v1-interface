import { ReactNode } from 'react'
import styled from 'styled-components'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'

interface ButtonProps {
  onClick?: () => void
  label: string
  type?: 'button' | 'submit' | 'submit'
  icon: ReactNode
  isLoading?: boolean
  disabled?: boolean
  small?: boolean
  block?: boolean
  ghost?: boolean
}

export default function Button({
  onClick,
  label,
  disabled,
  icon,
  isLoading = false,
  small = false,
  block = false,
  ghost = false
}: ButtonProps) {
  const { t } = useLocaleTranslation()

  return (
    <Container
      onClick={onClick}
      disabled={disabled}
      className={`${small && 'small'} ${block && 'block'} ${ghost && 'ghost'} `}
    >
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

    &.ghost {
      background: transparent;
      border: none;

      color: ${({ theme }) => theme.colorV2.blue[1]};
      &:hover {
        background: transparent;
        color: ${({ theme }) => theme.color.secondary};
      }
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
