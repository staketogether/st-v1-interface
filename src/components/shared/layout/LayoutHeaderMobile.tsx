import Wallet from '@/components/wallet/Wallet'
import WalletSidebarMobileSetting from '@/components/wallet/WalletSidebarMobileSetting'
import useConnectedAccount from '@/hooks/useConnectedAccount'
import useLayoutSidebarMobileMenu from '@/hooks/useLayoutSidebarMobileMenu'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import useWalletSidebarMobileSettings from '@/hooks/useWalletSidebarMobileSettings'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PiGear, PiListBold } from 'react-icons/pi'
import { GoSearch } from "react-icons/go";
import styled from 'styled-components'
import stIcon from '../../../../public/assets/st-icon.png'
import SkeletonLoading from '../icons/SkeletonLoading'
import LayoutSidebarMobileMenu from './LayoutSidebarMobileMenu'

/*
const LayoutNetworkDropdown = dynamic(() => import('./LayoutNetworkDropdown'), {
  ssr: false,
  loading: () => <SkeletonLoading width={80} height={32} />,
  suspense: true
})
*/

export default function LayoutHeaderMobile() {
  const { t } = useLocaleTranslation()

  const { query } = useRouter()
  const { currency } = query
  const { account, accountIsConnected, chainId: walletChainId } = useConnectedAccount()
  const { setWalletSidebarMobileSettings } = useWalletSidebarMobileSettings()

  return (
    <>
      <Container>
        <Content>
          <Logo href={`/${currency as string}/staking`}>
            <Image src={stIcon} alt={t('stakeTogether')} width={40} height={32} />
          </Logo>
          <WalletContainer>
            <MenuContainer
              onClick={() => {
                setWalletSidebarMobileSettings(true)
              }}
            >
              <GoSearch size={22}/>
              <SettingIcon size={22}/>
            </MenuContainer>
            <Wallet account={account} accountIsConnected={accountIsConnected} walletChainId={walletChainId} />
          </WalletContainer>
        </Content>
      </Container>
      <LayoutSidebarMobileMenu account={account} />
      <WalletSidebarMobileSetting />
    </>
  )
}

const { Container, Content, WalletContainer, Logo, MenuContainer, SettingIcon } = {
  Container: styled.header`
    display: grid;
    gap: ${({ theme }) => theme.size[24]};
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      display: none;
    }
  `,
  MenuContainer: styled.div`
    cursor: pointer;
    border-radius: ${({ theme }) => theme.size[8]};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.color.gray[500]};
    gap: ${({ theme }) => theme.size[16]};
    &:hover {
      background-color: ${({ theme }) => theme.colorV2.foreground};
    }
  `,
  Content: styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: ${({ theme }) => theme.size[24]};
  `,
  WalletContainer: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[16]};
    justify-content: flex-end;
  `,
  Logo: styled(Link)`
    width: 40px;
    height: 32px;
  `,
  SettingIcon: styled(PiGear)`
    font-size: 18px;
  `
}
