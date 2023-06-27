import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineBarChart, AiOutlineCodeSandbox, AiOutlineFire } from 'react-icons/ai'
import { styled } from 'styled-components'
import stIcon from '../../../../public/assets/st-icon.png'
import useActiveRoute from '../../../hooks/useActiveRoute'
import useTranslation from '../../../hooks/useTranslation'
import Wallet from '../wallet/Wallet'
import LayoutSearch from './LayoutSearch'

export default function LayoutHeader() {
  const { t } = useTranslation()

  const { isActive } = useActiveRoute()
  return (
    <Container>
      <MenuContainer>
        <Logo href='/explore'>
          <Image src={stIcon} alt={t('stakeTogether')} width={40} height={32} />
        </Logo>
        <Menu>
          <Link href='/explore'>
            <MenuButton className={`${isActive('explore') ? 'active' : ''}`}>
              <AiOutlineFire size={16} />
              {t('explore')}
            </MenuButton>
          </Link>
          <Link href='/stake/deposit'>
            <MenuButton className={`${isActive('stake') || isActive('unstake') ? 'active' : ''}`}>
              <AiOutlineCodeSandbox size={16} /> {t('stake')}
            </MenuButton>
          </Link>
          <Link href='#' title={t('soon')}>
            <MenuButton disabled>
              <AiOutlineBarChart size={16} /> {t('analytics')}
            </MenuButton>
          </Link>
        </Menu>
      </MenuContainer>
      <WalletContainer>
        <LayoutSearch />
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
      grid-template-columns: 1fr 1fr;
      gap: ${({ theme }) => theme.size[32]};
    }
  `,
  MenuContainer: styled.div`
    display: grid;
    grid-template-columns: auto;
    justify-content: center;
    align-items: center;
    grid-template-columns: 40px 1fr;
    gap: ${({ theme }) => theme.size[32]};
    @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    }
  `,
  WalletContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: ${({ theme }) => theme.size[16]};
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
    display: grid;
    grid-template-columns: 16px 1fr;
    gap: ${({ theme }) => theme.size[4]};
    align-items: center;
    width: auto;
    height: 32px;
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.whiteAlpha[600]};
    border: none;
    border-radius: ${({ theme }) => theme.size[16]};
    padding: 0 ${({ theme }) => theme.size[16]};
    transition: background-color 0.1s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};

    &:hover {
      background-color: ${({ theme }) => theme.color.whiteAlpha[800]};
    }

    &.active {
      color: ${({ theme }) => theme.color.secondary};
    }

    &:disabled {
      background-color: ${({ theme }) => theme.color.whiteAlpha[300]};
      color: ${({ theme }) => theme.color.blackAlpha[600]};
    }
  `
}
