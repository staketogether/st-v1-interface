import Wallet from '@/components/wallet/Wallet'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import stLogoDesktop from '../../../../public/assets/stake-together-desk.svg'
import useActiveRoute from '../../../hooks/useActiveRoute'
import useLocaleTranslation from '../../../hooks/useLocaleTranslation'

export default function LayoutHeader() {
  const { t } = useLocaleTranslation()

  const { isActive } = useActiveRoute()
  return (
    <Container>
      <MenuContainer>
        <div>
          <Logo href='/invest'>
            <Image src={stLogoDesktop} alt={t('stakeTogether')} width={162} height={27} />
          </Logo>
        </div>
        <Menu>
          <Link href='/invest' legacyBehavior>
            <MenuButton
              className={`${isActive('invest') || isActive('deposit') || isActive('withdraw') ? 'active' : ''}`}
            >
              {t('v2.header.invest')}
            </MenuButton>
          </Link>
          <Link href='/incentives' legacyBehavior>
            <MenuButton className={`${isActive('incentives') ? 'active' : ''}`}>
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

const { Container, MenuContainer, WalletContainer, Logo, Menu, MenuButton } = {
  Container: styled.header`
    display: none;
    gap: ${({ theme }) => theme.size[32]};
    background: ${({ theme }) => theme.colorV2.white};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    padding: ${props => props.theme.size[16]} ${props => props.theme.size[24]};
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
    grid-template-columns: auto auto;
    gap: ${({ theme }) => theme.size[24]};
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
    color: ${({ theme }) => theme.colorV2.gray};

    &:hover {
      color: ${({ theme }) => theme.colorV2.purple[1]};
    }

    &.active {
      color: ${({ theme }) => theme.colorV2.purple[1]};
    }
  `
}
