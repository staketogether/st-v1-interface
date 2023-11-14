import { ReactNode, InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import Loading from './icons/Loading'

type ButtonProps = InputHTMLAttributes<HTMLButtonElement> & {
  onClick?: () => void
  label: string
  type?: 'button' | 'submit' | 'submit'
  icon: ReactNode
  isLoading?: boolean
  disabled?: boolean
  small?: boolean
  block?: boolean
  ghost?: boolean
  className?: string
}

export default function Button({
  onClick,
  label,
  disabled,
  icon,
  type = 'button',
  className,
  isLoading = false,
  small = false,
  block = false,
  ghost = false
}: ButtonProps) {
  return (
    <Container
      onClick={onClick}
      disabled={disabled || isLoading}
      type={type}
      className={`${small && 'small'} ${block && 'block'} ${ghost && 'ghost'} ${className}`}
    >
      {isLoading ? <Loading size={small ? 14 : 16} /> : icon}
      {label}
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

      color: ${({ theme }) => theme.colorV2.gray[1]};
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
