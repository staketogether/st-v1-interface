import { styled } from 'styled-components'

import chainConfig from '@/config/chain'
import useConnectedAccount from '@/hooks/useConnectedAccount'
import useEns from '@/hooks/useEns'
import Image from "next/legacy/image"
import { AiOutlineSwap } from 'react-icons/ai'
import { useNetwork, useSwitchNetwork } from 'wagmi'
import useStAccount from '../../hooks/subgraphs/useStAccount'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'
import useWalletSidebar from '../../hooks/useWalletSidebar'
import { truncateWei } from '../../services/truncate'
import EnsAvatar from '../shared/ens/EnsAvatar'
import WalletName from './WalletName'

type WalletConnectedButtonProps = {
  address: `0x${string}`
  showBalance?: boolean
  showNetwork?: boolean
}

export default function WalletConnectedButton({ address, showBalance = true }: WalletConnectedButtonProps) {
  const { setOpenSidebar } = useWalletSidebar()
  const { t } = useLocaleTranslation()

  const chain = chainConfig()

  const { accountBalance } = useStAccount(address)
  const { chain: walletChainId } = useNetwork()
  const isWrongNetwork = chain.chainId !== walletChainId?.id
  const { switchNetworkAsync } = useSwitchNetwork({
    chainId: chain.chainId
  })
  const { web3AuthUserInfo } = useConnectedAccount()
  const { name: ensName, nameLoading: ensLoading } = useEns(address)

  const handleActionButton = () => {
    if (isWrongNetwork && switchNetworkAsync) {
      switchNetworkAsync()
      return
    }
    setOpenSidebar(true)
  }

  return (
    <ConnectedButton onClick={handleActionButton} className={`${isWrongNetwork ? 'wrongNetwork' : ''}`}>
      {isWrongNetwork ? (
        <NetworkWrong>
          <AiOutlineSwap />
          <span>{t('wrongNetwork')}</span>
        </NetworkWrong>
      ) : (
        <>
          {showBalance && (
            <Balance>
              <span>{truncateWei(accountBalance)}</span>
              <span>{t('lsd.symbol')}</span>
            </Balance>
          )}
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
              <EnsAvatar address={address} size={24} />
            )}
          </EnsAddress>
        </>
      )}
    </ConnectedButton>
  )
}

const { Balance, ConnectedButton, EnsAddress, NetworkWrong, Web3AuthProfileImage } = {
  ConnectedButton: styled.button`
    display: flex;
    gap: ${({ theme }) => theme.size[16]};
    align-items: center;
    width: auto;
    height: 32px;
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.colorV2.foreground};
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
  Balance: styled.div`
    display: none;
    gap: ${({ theme }) => theme.size[4]};
    font-size: ${({ theme }) => theme.font.size[14]};
    > span:first-child {
      color: ${({ theme }) => theme.color.primary};
    }
    > span:last-child {
      color: ${({ theme }) => theme.color.secondary};
    }
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      display: flex;
      justify-content: flex-start;
    }
  `,
  EnsAddress: styled.div`
    display: grid;
    grid-template-columns: auto 24px;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
  `,
  NetworkWrong: styled.div`
    display: flex;
    gap: ${({ theme }) => theme.size[8]};
    align-items: center;
  `,
  Web3AuthProfileImage: styled(Image)`
    border-radius: 50%;
  `
}
