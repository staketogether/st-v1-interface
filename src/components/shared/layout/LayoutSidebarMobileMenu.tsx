import ProjectCreateModal from '@/components/project/ProjectCreateModal'
import useContentfulPoolDetails from '@/hooks/contentful/useContentfulPoolDetails'
import useLayoutSidebarMobileMenu from '@/hooks/useLayoutSidebarMobileMenu'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import useProjectCreateModal from '@/hooks/useProjectCreateModal'
import useResizeView from '@/hooks/useResizeView'

import { Drawer } from 'antd'
import { PiCaretRight, PiPencilSimpleLine } from 'react-icons/pi'
import styled from 'styled-components'
import { ProjectButton } from '../../project/ProjectButton'
type LayoutSidebarMobileMenuProps = {
  account?: `0x${string}`
}

export default function LayoutSidebarMobileMenu({ account }: LayoutSidebarMobileMenuProps) {
  const { openSidebarMobileMenu, setOpenSidebarMobileMenu } = useLayoutSidebarMobileMenu()
  const { setOpenProjectCreateModal } = useProjectCreateModal()
  const { t } = useLocaleTranslation()

  const { poolDetail: poolDetailUs } = useContentfulPoolDetails({
    poolAddress: account,
    fetchPolicy: 'network-only',
    locale: 'en-US'
  })
  const { screenWidth, breakpoints } = useResizeView()

  return (
    <>
      <DrawerContainer
        placement='right'
        size='default'
        onClose={() => {
          setOpenSidebarMobileMenu(false)
        }}
        mask={true}
        open={openSidebarMobileMenu}
      >
        <HeaderContainer>
          <ClosedSidebarButton onClick={() => setOpenSidebarMobileMenu(false)}>
            <CloseSidebar fontSize={14} />
          </ClosedSidebarButton>
          <span>Menu</span>
        </HeaderContainer>
        <Container>
          {poolDetailUs ? (
            <MenuButton>
              <ProjectButton poolDetail={poolDetailUs} account={account} isMobile />
            </MenuButton>
          ) : (
            <MenuButton onClick={() => setOpenProjectCreateModal(true)}>
              <CreateProjectIcon /> {t('v2.createProject.title')}
            </MenuButton>
          )}
        </Container>
        {screenWidth < breakpoints.lg && <ProjectCreateModal account={account} poolDetail={poolDetailUs} />}
      </DrawerContainer>
    </>
  )
}

const {
  DrawerContainer,
  CreateProjectIcon,
  HeaderContainer,
  MenuButton,
  Container,
  CloseSidebar,
  ClosedSidebarButton
} = {
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
  HeaderContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${({ theme }) => theme.size[16]};
    height: 32px;
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
      background: ${({ theme }) => theme.colorV2.foreground};
    }
  `,
  CloseSidebar: styled(PiCaretRight)`
    color: ${({ theme }) => theme.colorV2.blue[1]} !important;
  `,
  Container: styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};
  `,
  MenuButton: styled.button`
    width: 100%;
    height: 32px;

    background: ${({ theme }) => theme.colorV2.white};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    border-radius: ${({ theme }) => theme.size[8]};
    font-size: 14px;

    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};

    border: none;
    padding: 0 ${({ theme }) => theme.size[12]};

    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.colorV2.gray[1]} !important;

    &.active {
      color: ${({ theme }) => theme.colorV2.purple[1]} !important;
    }
  `,
  CreateProjectIcon: styled(PiPencilSimpleLine)`
    font-size: 15px;
  `
}
