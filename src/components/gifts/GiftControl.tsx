import useConnectedAccount from '@/hooks/useConnectedAccount'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import useWalletSidebarConnectWallet from '@/hooks/useWalletSidebarConnectWallet'
import giftsImage from '@assets/images/gifts.jpg'
import Image from 'next/image'
import { PiArrowLineRight } from 'react-icons/pi'
import styled from 'styled-components'
import Button from '../shared/Button'
import LayoutTitle from '../shared/layout/LayoutTitle'
import GiftAccountConnected from './GiftAccountConnected'

export default function GiftControl() {
  const { t } = useLocaleTranslation()
  const { account } = useConnectedAccount()
  const { setOpenSidebarConnectWallet, openSidebarConnectWallet } = useWalletSidebarConnectWallet()

  return (
    <Container>
      <LayoutTitle title={t('v2.pages.gifts.title')} description={t('v2.pages.gifts.description')} />
      <GiftCard>
        {!account && (
          <>
            <Image src={giftsImage} width={420} height={240} alt='gifts' />
            <Title>{t('v2.gifts.titleOfAccount')}</Title>
            <Button
              onClick={() => setOpenSidebarConnectWallet(true)}
              label={t('v2.header.enter')}
              isLoading={openSidebarConnectWallet}
              icon={<ConnectWalletIcon />}
            />
          </>
        )}
        {account && <GiftAccountConnected account={account} />}
      </GiftCard>
      {/* <GiftHistoryList /> */}
    </Container>
  )
}

const { Container, GiftCard, Title, ConnectWalletIcon } = {
  Container: styled.div`
    display: grid;
    justify-content: center;
    gap: ${({ theme }) => theme.size[24]};
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      gap: ${({ theme }) => theme.size[24]};
      max-width: 468px;
    }
  `,
  GiftCard: styled.div`
    display: flex;
    padding: ${({ theme }) => theme.size[24]} ${({ theme }) => theme.size[24]};
    flex-direction: column;
    gap: 24px;
    box-shadow: ${({ theme }) => theme.shadow[100]};

    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.color.white};
  `,

  Title: styled.span`
    font-size: ${({ theme }) => theme.font.size[16]};
    line-height: 20px;
    text-align: center;
    font-weight: 400;
    padding: 12px;
  `,
  ConnectWalletIcon: styled(PiArrowLineRight)`
    font-size: 16px;
  `
}
