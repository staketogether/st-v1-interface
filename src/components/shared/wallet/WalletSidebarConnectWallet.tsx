import { Drawer } from 'antd'
import { useState } from 'react'
import { AiOutlineRight, AiOutlineSetting } from 'react-icons/ai'
import styled from 'styled-components'
import useTranslation from '../../../hooks/useTranslation'
import WalletSlideBarSettings from './WalletSlideBarSettings'
import useWalletSidebarConnectWallet from '@/hooks/useWalletSidebarConnectWallet'
import { useConnect } from 'wagmi'
import { capitalize } from '@/services/truncate'
import appleIcon from '@assets/icons/wallets/Apple.svg'
import metamask from '@assets/icons/wallets/Metamask.svg'
import walletConnect from '@assets/icons/wallets/WalletConnect.svg'
import google from '@assets/icons/wallets/Google.svg'
import coinbase from '@assets/icons/wallets/CoinbaseWallet.svg'
import facebook from '@assets/icons/wallets/Facebook.svg'
import Image from 'next/image'

export default function WalletSidebarConnectWallet() {
  const [isSettingsActive, setIsSettingsActive] = useState(false)
  const { connect, connectors } = useConnect()
  const { t } = useTranslation()
  const { openSidebarConnectWallet, setOpenSidebarConnectWallet } = useWalletSidebarConnectWallet()
  console.log(connectors)
  const handleConnectorImage = (walletName: string) => {
    switch (walletName) {
      case 'MetaMask':
        return <Image src={metamask} alt={'metamask'} width={32} height={32} />
      case 'WalletConnect':
        return <Image src={walletConnect} alt={'walletConnect'} width={32} height={32} />
      case 'Coinbase Wallet':
        return <Image src={coinbase} alt={'coinBaseWallet'} width={32} height={32} />
      case 'Facebook':
        return <Image src={facebook} alt={'coinBaseWallet'} width={32} height={32} />
      case 'Google':
        return <Image src={google} alt={'coinBaseWallet'} width={32} height={32} />
      case 'Apple':
        return <Image src={appleIcon} alt={'coinBaseWallet'} width={32} height={32} />
      default:
        break
    }
  }

  return (
    <DrawerContainer
      placement='right'
      size='default'
      onClose={() => setOpenSidebarConnectWallet(false)}
      mask={true}
      open={openSidebarConnectWallet}
    >
      {isSettingsActive ? (
        <WalletSlideBarSettings setIsSettingsActive={setIsSettingsActive} />
      ) : (
        <>
          <HeaderContainer>
            <ClosedSidebarButton onClick={() => setOpenSidebarConnectWallet(false)}>
              <CloseSidebar fontSize={14} />
            </ClosedSidebarButton>
            <Actions>
              <h2>{t('connectWalletSideBar.title')}</h2>
              <Button onClick={() => setIsSettingsActive(true)}>
                <SettingIcon fontSize={16} />
              </Button>
            </Actions>
          </HeaderContainer>
          <ContainerWalletConnect>
            {connectors.map((connector, index) => {
              const walletName =
                connector.id === 'web3auth'
                  ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    capitalize(connector.loginParams.loginProvider)
                  : connector.name
              return (
                <div key={connector.id + index} onClick={() => connect({ connector })}>
                  {handleConnectorImage(walletName)}
                  {walletName}
                </div>
              )
            })}
          </ContainerWalletConnect>
        </>
      )}
    </DrawerContainer>
  )
}

const {
  DrawerContainer,
  HeaderContainer,
  CloseSidebar,
  ClosedSidebarButton,
  Button,
  SettingIcon,
  Actions,
  ContainerWalletConnect
} = {
  DrawerContainer: styled(Drawer)`
    background-color: ${({ theme }) => theme.color.whiteAlpha[900]} !important;

    .ant-drawer-header.ant-drawer-header-close-only {
      display: none;
    }

    .ant-drawer-body {
      width: calc(100vw - 80px);
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[24]};
      padding: ${({ theme }) => theme.size[24]};
      @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        width: 378px;
      }
    }
  `,
  HeaderContainer: styled.div`
    display: flex;
    justify-content: space-between;
    gap: ${({ theme }) => theme.size[16]};
  `,

  ClosedSidebarButton: styled.button`
    position: absolute;
    left: -44px;
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: ${({ theme }) => theme.size[16]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background: ${({ theme }) => theme.color.whiteAlpha[700]};
    transition: background 0.2s ease;
    line-height: 36px;

    &:hover {
      background: ${({ theme }) => theme.color.whiteAlpha[900]};
    }
  `,
  SettingIcon: styled(AiOutlineSetting)`
    color: ${({ theme }) => theme.color.primary};
  `,
  CloseSidebar: styled(AiOutlineRight)`
    color: ${({ theme }) => theme.color.primary};
  `,
  Button: styled.button`
    display: grid;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: ${({ theme }) => theme.size[16]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background: ${({ theme }) => theme.color.whiteAlpha[700]};
    transition: background 0.2s ease;
    line-height: 36px;

    &:hover {
      background: ${({ theme }) => theme.color.whiteAlpha[900]};
    }

    &:first-of-type {
      margin-left: auto;
    }
  `,
  Actions: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      font-size: ${({ theme }) => theme.font.size[16]};
      color: ${({ theme }) => theme.color.primary};
    }
  `,
  ContainerWalletConnect: styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    div {
      cursor: pointer;
      width: 100%;
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[12]};
      padding: ${({ theme }) => theme.size[16]};
      background: ${({ theme }) => theme.color.blackAlpha[50]};
      transition: background 0.2s ease;
      font-weight: 500;
      border-radius: 8px;
      &:hover {
        background: ${({ theme }) => theme.color.blackAlpha[200]};
      }
    }
  `
}
