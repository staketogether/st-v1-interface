import styled from 'styled-components'
import useWalletSidebar from '../../hooks/useWalletSidebar'
import EnsAvatar from '../shared/ens/EnsAvatar'
import WalletName from './WalletName'

interface WalletBitcoinConnectedButtonProps {
  address: string
}

export default function WalletBitcoinConnectedButton({ address }: WalletBitcoinConnectedButtonProps) {
  const { setOpenSidebar } = useWalletSidebar()

  const handleActionButton = () => {
    setOpenSidebar(true)
  }

  return (
    <ConnectedButton onClick={handleActionButton}>
      <EnsAddress>
        <WalletName walletAddress={address} />
        <EnsAvatar address={address} size={24} />
      </EnsAddress>
    </ConnectedButton>
  )
}

const { ConnectedButton, EnsAddress } = {
  ConnectedButton: styled.button`
    display: flex;
    gap: ${({ theme }) => theme.size[16]};
    align-items: center;
    height: 32px;
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.colorV2.blue[1]};
    border: none;
    border-radius: ${({ theme }) => theme.size[8]};
    padding: 0 5px;
    transition: background-color 0.1s ease;
    box-shadow: ${({ theme }) => theme.shadow[200]};

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      width: auto;
      padding: 0 10px;
    }

    &:hover {
      background-color: ${({ theme }) => theme.colorV2.purple[1]};
    }

    &.wrongNetwork {
      background-color: ${({ theme }) => theme.color.red[400]};
      color: ${({ theme }) => theme.color.white};
    }
  `,
  EnsAddress: styled.div`
    display: grid;
    grid-template-columns: auto 24px;
    align-items: center;
    gap: 8px;
  `
}
