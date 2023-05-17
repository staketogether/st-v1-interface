import styled from 'styled-components'

import { globalConfig } from '../../../config/global'
import useCethBalanceOf from '../../../hooks/contracts/useCethBalanceOf'
import useWalletSidebar from '../../../hooks/useWalletSidebar'
import { truncateEther } from '../../../services/truncateEther'
import EnsAvatar from '../ens/EnsAvatar'
import EnsName from '../ens/EnsName'

export type WalletConnectedButtonProps = {
  address: `0x${string}`
}

export default function WalletConnectedButton({ address }: WalletConnectedButtonProps) {
  const { ceth } = globalConfig
  const cethBalance = useCethBalanceOf(address)
  const { setOpenSidebar } = useWalletSidebar()

  return (
    <ConnectedButton onClick={() => setOpenSidebar(true)}>
      <CethBalance>
        <span>{truncateEther(cethBalance)}</span>
        <span>{ceth.symbol}</span>
      </CethBalance>
      <EnsAddress>
        <EnsName address={address} />
        <EnsAvatar address={address} />
      </EnsAddress>
    </ConnectedButton>
  )
}

const { CethBalance, ConnectedButton, EnsAddress } = {
  ConnectedButton: styled.button`
    display: grid;
    grid-template-columns: auto auto;
    gap: ${({ theme }) => theme.size[8]};
    align-items: center;
    padding-left: 16px;
    padding-right: 8px;
    height: 32px;
    border-radius: ${({ theme }) => theme.size[16]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background-color: ${({ theme }) => theme.color.white};
    color: ${({ theme }) => theme.color.purple[600]};
    border: 1px solid ${({ theme }) => theme.color.gray[100]};
  `,
  CethBalance: styled.div`
    display: grid;
    grid-template-columns: auto auto;
    justify-content: flex-start;
    gap: 4px;
    font-weight: 400;
    font-size: ${({ theme }) => theme.font.size[14]};
    line-height: 17px;

    > span:first-child {
      color: ${({ theme }) => theme.color.blue[300]};
    }
    > span:last-child {
      color: ${({ theme }) => theme.color.purple[600]};
    }
  `,
  EnsAddress: styled.div`
    display: grid;
    grid-template-columns: auto 24px;
    gap: 8px;
    justify-content: flex-end;
  `
}
