import { useConnectModal } from '@rainbow-me/rainbowkit'
import styled from 'styled-components'
import useConnectedAccount from '../../hooks/useConnectedAccount'

interface StakeButtonProps {
  onClick: () => void
  label: string
  amount: string
  isLoading: boolean
  disabled?: boolean
}

export default function StakeButton({ onClick, label, amount, disabled }: StakeButtonProps) {
  const { accountIsConnected } = useConnectedAccount()
  const { openConnectModal } = useConnectModal()

  return (
    <>
      {accountIsConnected && amount && (
        <Stake onClick={onClick} disabled={disabled}>
          {label}
        </Stake>
      )}
      {accountIsConnected && !amount && <Stake onClick={openConnectModal}>{label}</Stake>}
      {!accountIsConnected && (
        <Stake onClick={onClick} disabled={disabled}>
          {label}
        </Stake>
      )}
    </>
  )
}

const { Stake } = {
  Stake: styled.button`
    border: none;
    color: ${({ theme }) => theme.color.white};
    border-radius: ${props => props.theme.size[16]};
    background: ${({ theme }) => theme.color.blue[400]};
    transition: background-color 0.2s ease;
    height: 48px;

    font-size: ${({ theme }) => theme.font.size[16]};

    &:hover {
      background: ${({ theme }) => theme.color.blue[600]};
    }
  `
}
