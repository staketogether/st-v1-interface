import Image from 'next/image'
import Link from 'next/link'
import { BsCoin, BsDatabaseUp } from 'react-icons/bs'
import styled from 'styled-components'
import stLogoDesktop from '../../../../public/assets/st-logo-desktop.png'
import useActiveRoute from '../../../hooks/useActiveRoute'
import useTranslation from '../../../hooks/useTranslation'
import Wallet from '../wallet/Wallet'

export default function LayoutHeader() {
  const { t } = useTranslation()

  const { isActive } = useActiveRoute()
  return (
    <Container>
      <LogoContainer>
        <Logo href='/pools'>
          <Image src={stLogoDesktop} alt={t('stakeTogether')} width={162} height={32} />
        </Logo>
      </LogoContainer>
      <MenuContainer>
        <Menu>
          <Link href='/pools'>
            <MenuButton
              className={`${isActive('pools') || isActive('stake') || isActive('unstake') ? 'active' : ''}`}
            >
              <BsCoin fontSize={18} />
              {t('v2.header.invest')}
            </MenuButton>
          </Link>
          <Link href='/incentives'>
            <MenuButton className={`${isActive('incentives') ? 'active' : ''}`}>
              <BsDatabaseUp fontSize={18} />
              {t('v2.header.incentives')}
            </MenuButton>
          </Link>
        </Menu>
      </MenuContainer>
      <WalletContainer>
        <Wallet />
      </WalletContainer>
    </Container>
  )
}

const { Container, LogoContainer, MenuContainer, WalletContainer, Logo, Menu, MenuButton } = {
  Container: styled.header`
    display: none;
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: ${({ theme }) => theme.size[32]};
    }
  `,
  LogoContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
  `,
  MenuContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  WalletContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: ${({ theme }) => theme.size[8]};
  `,
  Menu: styled.nav`
    display: none;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      display: flex;
      justify-content: flex-start;
      gap: ${({ theme }) => theme.size[16]};
    }
  `,
  Logo: styled(Link)`
    width: 40px;
    height: 32px;
  `,
  MenuButton: styled.button`
    display: flex;
    gap: ${({ theme }) => theme.size[8]};
    align-items: center;
    width: auto;
    height: 32px;
    font-size: ${({ theme }) => theme.font.size[16]};
    color: ${({ theme }) => theme.color.primary};
    border: none;
    padding: 0 ${({ theme }) => theme.size[16]};
    background: none;

    &:hover {
      color: ${({ theme }) => theme.color.secondary};
    }

    &.active {
      color: ${({ theme }) => theme.color.secondary};
    }
  `
}
