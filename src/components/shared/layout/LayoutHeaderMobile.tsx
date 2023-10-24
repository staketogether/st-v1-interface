import Wallet from '@/components/wallet/Wallet'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import stIcon from '../../../../public/assets/st-icon.png'
import { useRouter } from 'next/router'
import useConnectedAccount from '@/hooks/useConnectedAccount'

export default function LayoutHeaderMobile() {
  const { t } = useLocaleTranslation()
  const { query } = useRouter()
  const { currency, network } = query
  const { account, accountIsConnected } = useConnectedAccount()
  return (
    <Container>
      <Content>
        <Logo href={`/${network}/${currency}/invest`}>
          <Image src={stIcon} alt={t('stakeTogether')} width={40} height={32} />
        </Logo>
        <WalletContainer>
          <Wallet account={account} accountIsConnected={accountIsConnected} />
        </WalletContainer>
      </Content>
    </Container>
  )
}

const { Container, Content, WalletContainer, Logo } = {
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
  `
}
