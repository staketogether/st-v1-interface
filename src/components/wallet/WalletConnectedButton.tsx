import useConnectedAccount from '@/hooks/useConnectedAccount'
import useEns from '@/hooks/useEns'
import Image from 'next/image'
import styled from 'styled-components'
import { useAccount } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'
import useWalletSidebar from '../../hooks/useWalletSidebar'
import EnsAvatar from '../shared/ens/EnsAvatar'
import WalletName from './WalletName'

interface WalletConnectedButtonProps {
  address: `0x${string}`
}

export default function WalletConnectedButton({ address }: WalletConnectedButtonProps) {
  const { setOpenSidebar } = useWalletSidebar()
  const { t } = useLocaleTranslation()

  const { chain: walletChainId } = useAccount()

  const { web3AuthUserInfo } = useConnectedAccount()
  const { name: ensName, nameLoading: ensLoading, avatar, avatarLoading } = useEns(address, walletChainId?.id ?? mainnet.id)

  const handleActionButton = () => {
    setOpenSidebar(true)
  }

  return (
    <ConnectedButton onClick={handleActionButton}>
      <EnsAddress>
        {web3AuthUserInfo?.profileImage ? (
          <Web3AuthProfileImage src={web3AuthUserInfo.profileImage} alt={t('stakeTogether')} width={24} height={24} />
        ) : (
          <EnsAvatar address={address} size={24} avatarLoading={avatarLoading} avatar={avatar} />
        )}
        <WalletName walletAddress={address} web3AuthUserInfo={web3AuthUserInfo} ensName={ensName} ensLoading={ensLoading} />
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
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.colorV2.blue[1]};
    border: none;
    border-radius: ${({ theme }) => theme.size[8]};
    padding: 0 10px;
    transition: background-color 0.1s ease;
    box-shadow: ${({ theme }) => theme.shadow[200]};

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
    grid-template-columns: 24px auto;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
  `,
  Web3AuthProfileImage: styled(Image)`
    border-radius: 50%;
  `
}
