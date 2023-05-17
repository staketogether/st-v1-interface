import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import stIcon from '../../../../public/assets/st-icon.png'
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
          <Image src={stIcon} alt={app.name} width={40} height={32} />
        </Logo>
        <Menu>
          <Link href='/'>
            <MenuButton className={`${isActive('explore') ? 'active' : ''}`}>{t('explore')}</MenuButton>
          </Link>
          <Link href='/stake'>
            <MenuButton className={`${isActive('stake') || isActive('unstake') ? 'active' : ''}`}>
              {t('stake')}
            </MenuButton>
          </Link>
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

const { Container, MenuContainer, SearchContainer, WalletContainer, Logo, Menu, MenuButton } = {
  Container: styled.header`
    display: grid;
    grid-template-columns: 1fr 300px 1fr;
    gap: ${({ theme }) => theme.size[32]};
  `,
  MenuContainer: styled.div`
    display: grid;
    grid-template-columns: 40px 1fr;
    justify-content: flex-start;
    align-items: center;
    gap: ${({ theme }) => theme.size[32]};
  `,
  SearchContainer: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    justify-content: center;
  `,
  WalletContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
  `,
  Menu: styled.nav`
    display: flex;
    justify-content: flex-start;
    gap: ${({ theme }) => theme.size[16]};
  `,
  Logo: styled(Link)`
    width: 40px;
    height: 32px;
  `,
  MenuButton: styled.button`
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
      background-color: ${({ theme }) => theme.color.whiteAlpha[700]};
    }

    &.active {
      background-color: ${({ theme }) => theme.color.whiteAlpha[700]};
      color: ${({ theme }) => theme.color.secondary};
    }
  `
}
