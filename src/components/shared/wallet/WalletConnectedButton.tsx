import styled from 'styled-components'

import { globalConfig } from '../../../config/global'
import useCethBalanceOf from '../../../hooks/contracts/useCethBalanceOf'
import useWalletSidebar from '../../../hooks/useWalletSidebar'
import { truncateEther } from '../../../services/truncateEther'
import EnsAvatar from '../ens/EnsAvatar'
import EnsName from '../ens/EnsName'

export type WalletConnectedButtonProps = {
  address: `0x${string}`
  showBalance?: boolean
}

export default function WalletConnectedButton({
  address,
  showBalance = true
}: WalletConnectedButtonProps) {
  const { ceth } = globalConfig
  const cethBalance = useCethBalanceOf(address)
  const { setOpenSidebar } = useWalletSidebar()

  return (
    <ConnectedButton onClick={() => setOpenSidebar(true)}>
      {showBalance && (
        <CethBalance>
          <span>{truncateEther(cethBalance)}</span>
          <span>{ceth.symbol}</span>
        </CethBalance>
      )}
      <EnsAddress>
        <EnsName address={address} />
        <EnsAvatar address={address} />
      </EnsAddress>
    </ConnectedButton>
  )
}

const { CethBalance, ConnectedButton, EnsAddress } = {
  ConnectedButton: styled.button`
    display: flex;
    gap: ${({ theme }) => theme.size[16]};
    align-items: center;
    width: auto;
    height: 32px;
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.whiteAlpha[600]};
    border: none;
    border-radius: ${({ theme }) => theme.size[16]};
    padding: 0 ${({ theme }) => theme.size[16]};
    transition: background-color 0.1s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};

    padding-right: ${({ theme }) => theme.size[12]};

    &:hover {
      background-color: ${({ theme }) => theme.color.whiteAlpha[800]};
    }

    &.active {
      background-color: ${({ theme }) => theme.color.whiteAlpha[800]};
      color: ${({ theme }) => theme.color.primary};
    }
  `,
  CethBalance: styled.div`
    display: flex;
    justify-content: flex-start;
    gap: 4px;
    font-size: ${({ theme }) => theme.font.size[14]};

    > span:first-child {
      color: ${({ theme }) => theme.color.primary};
    }
    > span:last-child {
      color: ${({ theme }) => theme.color.secondary};
    }
  `,
  EnsAddress: styled.div`
    display: grid;
    grid-template-columns: auto 24px;
    gap: 8px;
    justify-content: flex-end;
  `
}
