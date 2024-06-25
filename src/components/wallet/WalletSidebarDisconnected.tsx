import useWalletSidebarConnectWallet from '@/hooks/useWalletSidebarConnectWallet'
import { Drawer } from 'antd'
import { useState } from 'react'
import { PiCaretRight, PiGear } from 'react-icons/pi'
import styled from 'styled-components'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'
import ConnectWallet from '../shared/ConnectWallet'
import WalletSidebarSettings from './WalletSidebarSettings'

export default function WalletSidebarDisconnected() {
  const [isSettingsActive, setIsSettingsActive] = useState(false)
  const { t } = useLocaleTranslation()
  const { openSidebarConnectWallet, setOpenSidebarConnectWallet } = useWalletSidebarConnectWallet()
  const isSimplified = !!process.env.NEXT_PUBLIC_SIMPLIFIED

  return (
    <DrawerContainer
      placement='right'
      size='default'
      onClose={() => setOpenSidebarConnectWallet(false)}
      mask={true}
      open={openSidebarConnectWallet}
    >
      {isSettingsActive ? (
        <WalletSidebarSettings setIsSettingsActive={setIsSettingsActive} />
      ) : (
        <>
          <HeaderContainer>
            <ClosedSidebarButton onClick={() => setOpenSidebarConnectWallet(false)}>
              <CloseSidebar fontSize={14} />
            </ClosedSidebarButton>
            <Actions>
              <div>
                <h2>{t('connectWalletSideBar.title')}</h2>
                <Button onClick={() => setIsSettingsActive(true)}>
                  <SettingIcon fontSize={16} />
                </Button>
              </div>
            </Actions>
          </HeaderContainer>
          <ConnectWallet hasBtcWallet={!isSimplified} />
        </>
      )}
    </DrawerContainer>
  )
}

const { DrawerContainer, HeaderContainer, CloseSidebar, ClosedSidebarButton, Button, SettingIcon, Actions } = {
  DrawerContainer: styled(Drawer)`
    background: ${({ theme }) => theme.colorV2.background} !important;

    .ant-drawer-header.ant-drawer-header-close-only {
      display: none;
    }

    .ant-drawer-body {
      width: calc(100vw - 60px);
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[16]};
      padding: ${({ theme }) => theme.size[16]};
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
    left: -52px;
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: 8px;
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background: ${({ theme }) => theme.color.white};
    transition: background 0.2s ease;
    line-height: 36px;

    &:hover {
      background: ${({ theme }) => theme.color.whiteAlpha[600]};
    }
  `,
  SettingIcon: styled(PiGear)`
    color: ${({ theme }) => theme.colorV2.blue[1]} !important;
    &:hover {
      color: ${({ theme }) => theme.colorV2.purple[1]} !important;
    }
  `,
  CloseSidebar: styled(PiCaretRight)`
    color: ${({ theme }) => theme.colorV2.blue[1]} !important;
    &:hover {
      color: ${({ theme }) => theme.colorV2.purple[1]} !important;
    }
  `,
  Button: styled.button`
    display: grid;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: ${({ theme }) => theme.size[8]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background: ${({ theme }) => theme.colorV2.white};

    line-height: 36px;

    &:hover {
      background: ${({ theme }) => theme.colorV2.gray[4]};
      box-shadow: ${({ theme }) => theme.shadow[100]};
    }

    &:first-of-type {
      margin-left: auto;
    }
  `,
  Actions: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[16]};
    div:first-child {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h2 {
        font-size: ${({ theme }) => theme.font.size[18]};
        font-weight: 500;
      }
    }
  `
}
