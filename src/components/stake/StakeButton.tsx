import { useConnectModal } from '@rainbow-me/rainbowkit'
import styled from 'styled-components'
import { useAccount } from 'wagmi'

interface StakeButtonProps {
  onClick: () => void
  label: string
  amount: string
  isLoading: boolean
  disabled?: boolean
}

export default function StakeButton({ onClick, label, amount, disabled }: StakeButtonProps) {
  const { isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()

  return (
    <>
      {isConnected && amount && (
        <Stake onClick={onClick} disabled={disabled}>
          {label}
        </Stake>
      )}
      {isConnected && !amount && <Stake onClick={openConnectModal}>{label}</Stake>}
      {!isConnected && (
        <Stake onClick={onClick} disabled={disabled}>
          {label}
        </Stake>
      )}
    </>
  )
}

const { Stake } = {
  Stake: styled.button<{ unstake?: boolean }>`
    border: none;
    color: ${({ theme }) => theme.color.white};
    border-radius: ${props => props.theme.size[64]};
    background: ${({ theme, unstake }) => (unstake ? theme.color.purple[500] : theme.color.blue[100])};
    height: 100%;
    > span {
      font-weight: 500;
      font-size: ${({ theme }) => theme.font.size[18]};
      line-height: 22px;
      color: ${({ theme }) => theme.color.white};
    }
    &:hover,
    &:active,
    &:focus {
      background: ${({ theme, unstake }) => (unstake ? theme.color.purple[500] : theme.color.blue[100])};
      > span {
        font-weight: 500;
        font-size: ${({ theme }) => theme.font.size[18]};
        line-height: 22px;
        color: ${({ theme }) => theme.color.white};
      }
    }
  `
}
