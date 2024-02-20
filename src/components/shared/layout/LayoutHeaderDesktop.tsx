import ProjectCreateModal from '@/components/project/ProjectCreateModal'
import Wallet from '@/components/wallet/Wallet'
import useContentfulPoolDetails from '@/hooks/contentful/useContentfulPoolDetails'
import useConnectedAccount from '@/hooks/useConnectedAccount'
import useProjectCreateModal from '@/hooks/useProjectCreateModal'
import useResizeView from '@/hooks/useResizeView'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PiChartLine, PiCodesandboxLogo, PiCurrencyEth, PiPencilSimpleLine } from 'react-icons/pi'
import styled from 'styled-components'
import stLogoDesktop from '../../../../public/assets/stake-together-desk.svg'
import useActiveRoute from '../../../hooks/useActiveRoute'
import useLocaleTranslation from '../../../hooks/useLocaleTranslation'
import { ProjectButton } from '../../project/ProjectButton'

export default function LayoutHeader() {
  const { t } = useLocaleTranslation()
  const { isActive } = useActiveRoute()
  const { account, accountIsConnected } = useConnectedAccount()
  const { setOpenProjectCreateModal } = useProjectCreateModal()
  const { query, isReady, pathname } = useRouter()
  const { currency, network } = query

  const { poolDetail: poolDetailUs } = useContentfulPoolDetails({
    poolAddress: account,
    fetchPolicy: 'network-only',
    locale: 'en-US'
  })
  const { screenWidth, breakpoints } = useResizeView()
  const basePath = `/[network]/[currency]`
  const withdrawBasePath = `/[network]/[currency]/withdraw`
  const isHome = (pathname === basePath || pathname === withdrawBasePath) && isReady

  return (
    <Container>
      <MenuContainer>
        <div>
          <Logo href={`/${network}/${currency}/product`}>
            <Image src={stLogoDesktop} alt={t('stakeTogether')} width={162} height={27} />
          </Logo>
        </div>
        <Menu>
          <Link href={`/${network}/${currency}/product`}>
            <MenuButton className={`${isHome || isActive('products') ? 'active' : ''}`}>
              <InvestIcon />
              {t('v2.header.products')}
            </MenuButton>
          </Link>
          <Link href={`/${network}/${currency}/project`}>
            <MenuButton
              className={`${
                !isHome && (isActive('projects') || isActive('deposit') || isActive('withdraw')) ? 'active' : ''
              }`}
            >
              <ProjectsIcon />
              {t('v2.header.projects')}
            </MenuButton>
          </Link>
          <Link href={`/${network}/${currency}/analytics`}>
            <MenuButton className={`${!isHome && isActive('analytics') ? 'active' : ''}`}>
              <AnalyticsIcon />
              {t('v2.header.analytics')}
            </MenuButton>
          </Link>
        </Menu>
      </MenuContainer>
      <WalletContainer>
        {!poolDetailUs && (
          <MenuButton onClick={() => setOpenProjectCreateModal(true)}>
            <CreateProjectIcon /> {t('v2.createProject.title')}
          </MenuButton>
        )}
        {poolDetailUs && <ProjectButton poolDetail={poolDetailUs} account={account} />}
        <Wallet account={account} accountIsConnected={accountIsConnected} />
      </WalletContainer>
      {screenWidth > breakpoints.lg && <ProjectCreateModal account={account} poolDetail={poolDetailUs} />}
    </Container>
  )
}

const {
  Container,
  MenuContainer,
  WalletContainer,
  Logo,
  Menu,
  MenuButton,
  InvestIcon,
  ProjectsIcon,
  AnalyticsIcon,
  CreateProjectIcon
} = {
  Container: styled.header`
    display: none;
    gap: ${({ theme }) => theme.size[32]};
    background: ${({ theme }) => theme.colorV2.white};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    padding: ${props => props.theme.size[16]} ${props => props.theme.size[24]};
    position: fixed;
    left: 0;
    top: 0;
    z-index: 5;
    width: 100%;
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      display: grid;
      grid-template-columns: 1fr auto;
    }
  `,
  MenuContainer: styled.div`
    display: flex;
    grid-template-columns: 162px auto;
    align-items: center;
    gap: ${({ theme }) => theme.size[32]};

    > div:first-of-type {
      height: 32px;
      display: grid;
      grid-template-columns: 162px;
      align-items: center;

      a {
        display: flex;
        align-items: center;
      }
    }
  `,
  WalletContainer: styled.div`
    display: grid;
    align-items: center;
    justify-content: flex-end;
    gap: ${({ theme }) => theme.size[8]};
    grid-template-columns: auto auto;
  `,
  Menu: styled.nav`
    display: none;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[16]};
      justify-content: flex-start;
    }
  `,
  Logo: styled(Link)`
    width: 40px;
    height: 32px;
  `,
  MenuButton: styled.button`
    width: auto;
    height: 32px;
    border-radius: 99px;

    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};

    border: none;
    padding: 0 ${({ theme }) => theme.size[12]};
    background: transparent;

    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.colorV2.gray[1]} !important;

    &:hover {
      color: ${({ theme }) => theme.colorV2.purple[1]} !important;
    }

    &.active {
      color: ${({ theme }) => theme.colorV2.purple[1]} !important;
    }
  `,
  InvestIcon: styled(PiCurrencyEth)`
    font-size: 15px;
  `,
  ProjectsIcon: styled(PiCodesandboxLogo)`
    font-size: 15px;
  `,
  CreateProjectIcon: styled(PiPencilSimpleLine)`
    font-size: 15px;
  `,
  AnalyticsIcon: styled(PiChartLine)`
    font-size: 15px;
  `
}
