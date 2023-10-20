import useRegisterCommunitySidebar from '@/hooks/useRegisterCommunitySidebar'
import { Drawer } from 'antd'
import styled from 'styled-components'
import CommunityForm from '../shared/community/CommunityForm'
import { PiCaretRight } from 'react-icons/pi'

type CommunitySidebarRegisterProps = {
  account: `0x${string}`
  accountIsConnected: boolean
}

export default function CommunitySidebarRegister({
  account,
  accountIsConnected
}: CommunitySidebarRegisterProps) {
  // const { t } = useLocaleTranslation()
  const { openSidebar, setOpenSidebar } = useRegisterCommunitySidebar()

  return (
    <DrawerContainer
      placement='right'
      size='default'
      onClose={() => setOpenSidebar(false)}
      mask={true}
      open={openSidebar}
    >
      <Header>
        <h2>Cadastro de communidade</h2>
        <ClosedSidebarButton onClick={() => setOpenSidebar(false)}>
          <CloseSidebar fontSize={14} />
        </ClosedSidebarButton>
      </Header>
      <CommunityForm account={account} accountIsConnected={accountIsConnected} />
    </DrawerContainer>
  )
}

const { DrawerContainer, Header, ClosedSidebarButton, CloseSidebar } = {
  DrawerContainer: styled(Drawer)`
    background-color: ${({ theme }) => theme.colorV2.foreground} !important;

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
        width: 380px;
      }
    }
  `,
  Header: styled.header`
    h2 {
      font-size: ${({ theme }) => theme.font.size[16]};
      font-weight: 400;
    }
  `,
  ClosedSidebarButton: styled.button`
    position: absolute;
    left: -44px;
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: ${({ theme }) => theme.size[8]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background: ${({ theme }) => theme.color.white};
    transition: background 0.2s ease;
    line-height: 36px;

    &:hover {
      background: ${({ theme }) => theme.color.whiteAlpha[700]};
    }
  `,
  CloseSidebar: styled(PiCaretRight)`
    color: ${({ theme }) => theme.colorV2.blue[1]} !important;
  `
}
