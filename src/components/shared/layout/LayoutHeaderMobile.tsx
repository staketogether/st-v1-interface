import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import stIcon from '../../../../public/assets/st-icon.png'
import { globalConfig } from '../../../config/global'
import Wallet from '../wallet/Wallet'
import { SearchOutlined } from '@ant-design/icons'
import LayoutSearchSideBar, { searchModalVar } from './LayoutSearchSideBar'

export default function LayoutHeaderMobile() {
  const { app } = globalConfig

  return (
    <Container>
      <Content>
        <Logo href='/explore'>
          <Image src={stIcon} alt={app.name} width={40} height={32} />
        </Logo>
        <WalletContainer>
          <Button onClick={() => searchModalVar(true)}>
            <SearchOutlined />
          </Button>
          <Wallet />
        </WalletContainer>
      </Content>
      <LayoutSearchSideBar />
    </Container>
  )
}

const { Container, Content, WalletContainer, Logo, Button } = {
  Container: styled.header`
    display: grid;
    gap: ${({ theme }) => theme.size[24]};
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
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
  `
}
