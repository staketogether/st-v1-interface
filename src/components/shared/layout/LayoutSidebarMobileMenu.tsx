import ProjectCreateModal from '@/components/project/ProjectCreateModal'
import useContentfulPoolDetails from '@/hooks/contentful/useContentfulPoolDetails'
import useLayoutSidebarMobileMenu from '@/hooks/useLayoutSidebarMobileMenu'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import useProjectCreateModal from '@/hooks/useProjectCreateModal'
import useResizeView from '@/hooks/useResizeView'
import packageData from '../../../../package.json'
import { Drawer } from 'antd'
import { PiArrowSquareOut, PiCaretRight, PiPencilSimpleLine } from 'react-icons/pi'
import styled from 'styled-components'
import { ProjectButton } from '../../project/ProjectButton'
import { useRouter } from 'next/router'
import chainConfig from '@/config/chain'
import { globalConfig } from '@/config/global'
import useActiveRoute from '@/hooks/useActiveRoute'
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
  const { isActive } = useActiveRoute()
  const { query, isReady, pathname, locale } = useRouter()
  const { currency, network } = query

  const date = new Date()
  const { blockExplorer, contracts } = chainConfig()
  const { websiteUrl, auditUrl } = globalConfig
  const documentationUrl = locale
    ? locale === 'en'
      ? globalConfig.stakeTogetherUniversityUrlEn
      : globalConfig.stakeTogetherUniversityUrlBr
    : globalConfig.stakeTogetherUniversityUrlEn

  const basePath = `/[network]/[currency]`
  const withdrawBasePath = `/[network]/[currency]/withdraw`
  const isHome = (pathname === basePath || pathname === withdrawBasePath) && isReady

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
            <CloseSidebar fontSize={15} />
          </ClosedSidebarButton>
          <span>Menu</span>
        </HeaderContainer>
        <Container>
          <TopContainer>
            {poolDetailUs ? (
              <MenuButton>
                <ProjectButton poolDetail={poolDetailUs} account={account} isMobile />
              </MenuButton>
            ) : (
              <MenuButton onClick={() => setOpenProjectCreateModal(true)}>
                <CreateProjectIcon /> {t('v2.createProject.title')}
              </MenuButton>
            )}
          </TopContainer>
          <FooterContainer>
            <FooterContent>
              <a href={`${blockExplorer.baseUrl}/address/${contracts.StakeTogether}`} target='_blank'>
                {t('footer.smartContract')} <PiArrowSquareOut />
              </a>
              <a href={auditUrl} target='_blank'>
                {t('footer.audit')} <PiArrowSquareOut />
              </a>
              <a href={documentationUrl} target='_blank'>
                {t('footer.documentation')} <PiArrowSquareOut />
              </a>
              <a href={`${websiteUrl}`} target='_blank'>
                {t('footer.website')} <PiArrowSquareOut />
              </a>
              <a href={websiteUrl}>{`© ${date.getFullYear()} Stake Together | v${packageData.version} `}</a>
            </FooterContent>
          </FooterContainer>
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
  FooterContent,
  CloseSidebar,
  ClosedSidebarButton,
  TopContainer,
  FooterContainer
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
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  `,
  MenuButton: styled.button`
    width: 100%;
    height: 32px;

    background: ${({ theme }) => theme.colorV2.white};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    border-radius: ${({ theme }) => theme.size[8]};
    font-size: ${({ theme }) => theme.font.size[15]};

    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};

    border: none;
    padding: 0 ${({ theme }) => theme.size[12]};

    color: ${({ theme }) => theme.colorV2.gray[1]};
    a {
      color: ${({ theme }) => theme.colorV2.gray[1]};
    }

    &.active {
      a {
        color: ${({ theme }) => theme.colorV2.purple[1]};
      }
    }
  `,
  CreateProjectIcon: styled(PiPencilSimpleLine)`
    font-size: ${({ theme }) => theme.font.size[15]};
  `,
  TopContainer: styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};
  `,
  FooterContainer: styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};

    padding-bottom: 60px;
  `,
  FooterContent: styled.div`
    width: 100%;
    display: flex;
    padding: 16px;
    flex-direction: column;
    align-items: center;

    border-radius: 8px;
    background: ${({ theme }) => theme.colorV2.white};
    box-shadow: ${({ theme }) => theme.shadow[100]};

    a {
      width: 100%;
      text-decoration: none;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      align-items: center;
      padding: 4px 0;

      font-size: ${({ theme }) => theme.font.size[14]};
      font-weight: 500;
      color: ${({ theme }) => theme.colorV2.gray[1]};
      opacity: 0.8;

      &:last-child {
        border-top: 1px solid ${({ theme }) => theme.colorV2.gray[1]};
        padding-top: 4px;
      }
    }
  `
}
