import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import stLogoDesktop from '../../../../public/assets/st-logo-desktop.png'
import useActiveRoute from '../../../hooks/useActiveRoute'
import useTranslation from '../../../hooks/useTranslation'
import Wallet from '@/components/wallet/Wallet'
import { AiOutlineGift, AiOutlineRise } from 'react-icons/ai'

export default function LayoutHeader() {
  const { t } = useTranslation()

  const { isActive } = useActiveRoute()
  return (
    <Container>
      <MenuContainer>
        <div>
          <Logo href='/pools'>
            <Image src={stLogoDesktop} alt={t('stakeTogether')} width={162} height={32} />
          </Logo>
        </div>
        <Menu>
          <Link href='/pools'>
            <MenuButton
              className={`${isActive('pools') || isActive('stake') || isActive('unstake') ? 'active' : ''}`}
            >
              <AiOutlineRise />
              {t('v2.header.invest')}
            </MenuButton>
          </Link>
          <Link href='/incentives'>
            <MenuButton className={`${isActive('incentives') ? 'active' : ''}`}>
              <AiOutlineGift />
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
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      display: grid;
      grid-template-columns: 1fr 240px;
      gap: ${({ theme }) => theme.size[32]};
    }
  `,
  MenuContainer: styled.div`
    display: flex;
    grid-template-columns: 162px auto;
    gap: ${({ theme }) => theme.size[32]};
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
    color: ${({ theme }) => theme.color.blackAlpha[700]};

    &:hover {
      color: ${({ theme }) => theme.color.primary};
      background: ${({ theme }) => theme.color.whiteAlpha[700]};
    }

    &.active {
      color: ${({ theme }) => theme.color.primary};
      background: ${({ theme }) => theme.color.whiteAlpha[700]};
      box-shadow: ${({ theme }) => theme.shadow[100]};
    }
  `
}
