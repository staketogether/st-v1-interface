import styled from 'styled-components'
import useConnectedAccount from '@/hooks/useConnectedAccount'
import useEns from '@/hooks/useEns'
import Image from 'next/image'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'
import useWalletSidebar from '../../hooks/useWalletSidebar'

import EnsAvatar from '../shared/ens/EnsAvatar'
import WalletName from './WalletName'
import { useAccount } from 'wagmi'
import { Networks } from '@/config/chain'

type WalletConnectedButtonProps = {
  address: `0x${string}`
}

export default function WalletConnectedButton({ address }: WalletConnectedButtonProps) {
  const { setOpenSidebar } = useWalletSidebar()
  const { t } = useLocaleTranslation()

  const { chain: walletChainId } = useAccount()

  const { web3AuthUserInfo } = useConnectedAccount()
  console.log({ web3AuthUserInfo })
  const { name: ensName, nameLoading: ensLoading } = useEns(address, walletChainId!.id || Networks.Mainnet)

  const handleActionButton = () => {
    setOpenSidebar(true)
  }

  return (
    <ConnectedButton onClick={handleActionButton}>
      <EnsAddress>
        <WalletName
          walletAddress={address}
          web3AuthUserInfo={web3AuthUserInfo}
          ensName={ensName}
          ensLoading={ensLoading}
        />
        {web3AuthUserInfo ? (
          <Web3AuthProfileImage
            src={web3AuthUserInfo.profileImage}
            alt={t('stakeTogether')}
            width={24}
            height={24}
          />
        ) : (
          <EnsAvatar address={address} size={24} chainId={walletChainId!.id || Networks.Mainnet} />
        )}
      </EnsAddress>
    </ConnectedButton>
  )
}

const { ConnectedButton, EnsAddress, Web3AuthProfileImage } = {
  ConnectedButton: styled.button`
    display: flex;
    gap: ${({ theme }) => theme.size[16]};
    align-items: center;
    width: auto;
    height: 32px;
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.colorV2.gray[2]};
    border: none;
    border-radius: ${({ theme }) => theme.size[8]};
    padding: 0px ${({ theme }) => theme.size[8]} 0px ${({ theme }) => theme.size[16]};
    transition: background-color 0.1s ease;
    box-shadow: ${({ theme }) => theme.shadow[200]};

    &:hover {
      background-color: ${({ theme }) => theme.colorV2.foreground};
    }

    &.wrongNetwork {
      background-color: ${({ theme }) => theme.color.red[400]};
      color: ${({ theme }) => theme.color.white};
    }
  `,
  EnsAddress: styled.div`
    display: grid;
    grid-template-columns: auto 24px;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
  `,
  Web3AuthProfileImage: styled(Image)`
    border-radius: 50%;
  `
}
