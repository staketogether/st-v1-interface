import useWalletSidebarMobileSettings from '@/hooks/useWalletSidebarMobileSettings'
import { Drawer } from 'antd'
import { PiCaretRight } from 'react-icons/pi'
import styled from 'styled-components'
import WalletSidebarSettings from './WalletSidebarSettings'

export default function WalletSidebarMobileSetting() {
  const { walletSidebarMobileSettings, setWalletSidebarMobileSettings } = useWalletSidebarMobileSettings()

  return (
    <DrawerContainer
      placement='right'
      size='default'
      onClose={() => setWalletSidebarMobileSettings(false)}
      mask={true}
      open={walletSidebarMobileSettings}
    >
      <>
        <ClosedSidebarButton onClick={() => setWalletSidebarMobileSettings(false)}>
          <CloseSidebar fontSize={14} />
        </ClosedSidebarButton>

        <WalletSidebarSettings showBackButton={false} setIsSettingsActive={setWalletSidebarMobileSettings} />
      </>
    </DrawerContainer>
  )
}

const { DrawerContainer, ClosedSidebarButton, CloseSidebar } = {
  DrawerContainer: styled(Drawer)`

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
  CloseSidebar: styled(PiCaretRight)`
    color: ${({ theme }) => theme.colorV2.blue[1]} !important;
    &:hover {
      color: ${({ theme }) => theme.colorV2.purple[1]} !important;
    }
  `
}
