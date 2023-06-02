import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import stIcon from '../../../../public/assets/st-icon.png'
import Wallet from '../wallet/Wallet'
import LayoutSearchDrawer from './LayoutSearchSideBar'
import useTranslation from '@/hooks/useTranslation'
import { AiOutlineSearch } from 'react-icons/ai'
import useSearchDrawer from '@/hooks/useSearchDrawer'

export default function LayoutHeaderMobile() {
  const { setOpenSearchDrawer } = useSearchDrawer()
  const { t } = useTranslation()
  return (
    <Container>
      <Content>
        <Logo href='/explore'>
          <Image src={stIcon} alt={t('stakeTogether')} width={40} height={32} />
        </Logo>
        <WalletContainer>
          <Button onClick={() => setOpenSearchDrawer(true)}>
            <SearchIcon />
          </Button>
          <Wallet />
        </WalletContainer>
      </Content>
      <LayoutSearchDrawer />
    </Container>
  )
}

const { Container, Content, WalletContainer, Logo, Button, SearchIcon } = {
  Container: styled.header`
    display: grid;
    gap: ${({ theme }) => theme.size[24]};
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      display: none;
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
    gap: ${({ theme }) => theme.size[8]};
    justify-content: flex-end;
  `,
  Logo: styled(Link)`
    width: 40px;
    height: 32px;
  `,
  Button: styled.button`
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: ${({ theme }) => theme.size[16]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background: ${({ theme }) => theme.color.whiteAlpha[700]};
    transition: background 0.2s ease;
    display: grid;
    place-items: center;
  `,
  SearchIcon: styled(AiOutlineSearch)`
    color: ${({ theme }) => theme.color.primary};
  `
}
