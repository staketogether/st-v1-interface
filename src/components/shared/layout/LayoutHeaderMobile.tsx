import Wallet from '@/components/wallet/Wallet'
import WalletSidebarMobileSetting from '@/components/wallet/WalletSidebarMobileSetting'
import useConnectedAccount from '@/hooks/useConnectedAccount'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import useWalletSidebarMobileSettings from '@/hooks/useWalletSidebarMobileSettings'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PiGear } from 'react-icons/pi'
import styled from 'styled-components'
import stIcon from '../../../../public/assets/st-icon.png'
import LayoutSidebarMobileMenu from './LayoutSidebarMobileMenu'

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
            <MenuContainer>
              <SettingIcon
                size={22}
                onClick={() => {
                  setWalletSidebarMobileSettings(true)
                }}
              />
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
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      gap: ${({ theme }) => theme.size[24]};
    }
  `,
  WalletContainer: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[16]};
    justify-content: flex-end;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      gap: ${({ theme }) => theme.size[8]};
    }
  `,
  Logo: styled(Link)`
    width: 40px;
    height: 32px;
  `,
  SettingIcon: styled(PiGear)`
    font-size: 18px;
  `
}
