import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import stIcon from '../../../../public/assets/st-icon.svg'
import { globalConfig } from '../../../config/global'
import useActiveRoute from '../../../hooks/useActiveRoute'
import useTranslation from '../../../hooks/useTranslation'
import Wallet from '../wallet/Wallet'
import LayoutSearch from './LayoutSearch'

export default function LayoutHeader() {
  const { t } = useTranslation()
  const { app } = globalConfig
  const { isActive } = useActiveRoute()
  return (
    <Container>
      <MenuContainer>
        <Logo href='/'>
          <Image src={stIcon as string} alt={app.name} width={40} height={32} />
        </Logo>
        <Menu>
          <MenuLink href='/'>
            <MenuButton className={`${isActive('explore') ? 'active' : ''}`}>{t('explore')}</MenuButton>
          </MenuLink>
          <MenuLink href='/stake'>
            <MenuButton className={`${isActive('stake') || isActive('unstake') ? 'active' : ''}`}>
              {t('stake')}
            </MenuButton>
          </MenuLink>
        </Menu>
      </MenuContainer>
      <SearchContainer>
        <LayoutSearch />
      </SearchContainer>
      <WalletContainer>
        <Wallet />
      </WalletContainer>
    </Container>
  )
}

const { Container, MenuContainer, SearchContainer, WalletContainer, Logo, Menu, MenuLink, MenuButton } = {
  Container: styled.header`
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'menu menu wallet'
      'search search search';
    gap: ${({ theme }) => theme.size[24]};
    @media (min-width: 768px) {
      grid-template-columns: 1fr 482px 1fr;
      grid-template-areas: 'menu search wallet';
      gap: 0;
    }
  `,
  MenuContainer: styled.div`
    grid-area: menu;
    display: grid;
    grid-template-columns: 40px 1fr;
    align-items: center;
  `,
  SearchContainer: styled.div`
    grid-area: search;
  `,
  WalletContainer: styled.div`
    grid-area: wallet;
    margin-left: auto;
  `,
  Menu: styled.nav`
    display: flex;
    align-items: center;
    justify-self: center;
    gap: 16px;

    a {
      text-decoration: none;
    }
  `,
  MenuLink: styled(Link)``,
  MenuButton: styled.button<{ active?: boolean }>`
    border: none;
    display: flex;
    height: 32px;
    padding: 0px 16px;
    align-items: center;
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background: ${({ theme }) => theme.color.white};
    justify-content: center;
    border-radius: ${({ theme }) => theme.size[16]};
    transition: 0.6s;
    cursor: pointer;

    &:hover {
      background: ${({ theme }) => theme.color.purple[100]};
    }

    &.active {
      background: ${({ theme }) => theme.color.purple[100]};
    }

    > span {
      color: ${({ theme }) => theme.color.blue[300]};
      font-weight: 500;
      font-size: ${({ theme }) => theme.font.size[14]};
      line-height: 17px;
    }
  `,
  Logo: styled(Link)`
    font-size: ${({ theme }) => theme.font.size[24]};
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
  `
}
