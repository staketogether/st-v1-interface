import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import stIcon from '../../../../../public/assets/st-icon.png'
import { globalConfig } from '../../../../config/global'
import Wallet from '../../wallet/Wallet'
import LayoutSearch from '../LayoutSearch'

export default function LayoutHeaderMobile() {
  const { app } = globalConfig
  return (
    <Container>
      <Content>
        <Logo href='/explore'>
          <Image src={stIcon} alt={app.name} width={40} height={32} />
        </Logo>

        <WalletContainer>
          <Wallet />
        </WalletContainer>
      </Content>
      <SearchContainer>
        <LayoutSearch />
      </SearchContainer>
    </Container>
  )
}

const { Container, Content, SearchContainer, WalletContainer, Logo } = {
  Container: styled.header`
    display: flex;
    flex-direction: column;
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
  Logo: styled(Link)`
    width: 40px;
    height: 32px;
  `
}
