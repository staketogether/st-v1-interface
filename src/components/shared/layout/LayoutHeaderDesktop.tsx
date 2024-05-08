import Wallet from '@/components/wallet/Wallet'
import useConnectedAccount from '@/hooks/useConnectedAccount'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PiCodesandboxLogo, PiCoinsLight, PiChartLine, PiGlobe  } from 'react-icons/pi'
import styled from 'styled-components'
import stLogoDesktop from '../../../../public/assets/stake-together-desk.svg'
import useActiveRoute from '../../../hooks/useActiveRoute'
import useLocaleTranslation from '../../../hooks/useLocaleTranslation'
import SkeletonLoading from '../icons/SkeletonLoading'

const LayoutNetworkDropdown = dynamic(() => import('./LayoutNetworkDropdown'), {
  ssr: false,
  loading: () => <SkeletonLoading width={80} height={32} />,
  suspense: true
})

export default function LayoutHeader() {
  const { t } = useLocaleTranslation()
  const { isActive } = useActiveRoute()
  const { account, accountIsConnected } = useConnectedAccount()

  const { query, pathname } = useRouter()
  const { currency, network } = query

  const basePath = `/[currency]`
  const isHome = pathname === basePath

  const currencyText = [
    {
      key: 1,
      currency: 'brl'
    },
    {
      key: 2,
      currency: 'usd'
    },
    {
      key: 1,
      currency: 'eur'
    },
  ]

  return (
    <Container>
      <MenuContainer>
        <div>
          <Logo href={`/${currency as string}/staking`}>
            <Image src={stLogoDesktop} alt={t('stakeTogether')} width={162} height={27} />
          </Logo>
        </div>
        <Menu>
          <Link href={`/${currency as string}/crypto`}>
            <MenuButton className={`${isHome || isActive('crypto') ? 'active' : ''}`}>
              <CoinsIcon />
              {t('v2.header.assets')}
            </MenuButton>
          </Link>
          <Link href={`/${currency as string}/staking`}>
            <MenuButton className={`${isHome || isActive('staking') ? 'active' : ''}`}>
              <ChartIcon />
              {t('v2.header.staking')}
            </MenuButton>
          </Link>
          <Link href={`/${currency as string}/${(network as string) || 'optimism'}/project`}>
            <MenuButton className={`${!isHome && isActive('project') ? 'active' : ''}`}>
              <ProjectsIcon />
              {t('v2.header.projects')}
            </MenuButton>
          </Link>
        </Menu>
      </MenuContainer>
      <WalletContainer>
        <LayoutNetworkDropdown />
        <ContainerCurrency>
          <GlobeIcon />
          <span>PT</span>
          {currencyText.map(crn => (
            <span key={crn.key}>{currency === crn.currency ? `| ${crn.currency.toLocaleUpperCase()}` : ""}</span>
          ))}
        </ContainerCurrency>
        <Wallet account={account} accountIsConnected={accountIsConnected} />
      </WalletContainer>
    </Container>
  )
}

const { Container, MenuContainer, WalletContainer, ContainerCurrency, Logo, Menu, MenuButton, GlobeIcon, ProjectsIcon, CoinsIcon, ChartIcon } = {
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
      height: ${props => props.theme.size[32]};
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
    gap: ${({ theme }) => theme.size[16]};
    grid-template-columns: auto auto auto;
  `,
  ContainerCurrency: styled.div`
    display: flex;
    align-items: center;
    gap: 2px;

    span {
      color: ${({ theme }) => theme.color.gray[600]};
      font-family: Montserrat;
      font-size: ${({ theme }) => theme.font.size[14]};
      font-weight: 500;
      white-space: nowrap;
      cursor: pointer;
    }
  
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
    height: ${props => props.theme.size[32]};
  `,
  MenuButton: styled.button`
    width: auto;
    height: ${props => props.theme.size[32]};
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
  CoinsIcon: styled(PiCoinsLight)`
    font-size: ${props => props.theme.size[24]};
  `,
  GlobeIcon: styled(PiGlobe)`
    font-size: ${props => props.theme.size[24]};
    color: ${({ theme }) => theme.color.gray[500]};
  `,
  ChartIcon: styled(PiChartLine)`
    font-size: ${props => props.theme.size[24]};
  `,
  ProjectsIcon: styled(PiCodesandboxLogo)`
    font-size: ${props => props.theme.size[24]};
  `
}