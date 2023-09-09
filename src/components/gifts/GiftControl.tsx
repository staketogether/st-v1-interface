import React from 'react'
import styled from 'styled-components'
import LayoutTitle from '../shared/layout/LayoutTitle'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import Button from '../shared/Button'
import { PiArrowLineRight } from 'react-icons/pi'
import useConnectedAccount from '@/hooks/useConnectedAccount'
import useWalletSidebarConnectWallet from '@/hooks/useWalletSidebarConnectWallet'
import GiftHistoryList from './GiftHistoryList'
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
            <CardIcon />
            <Title>{t('v2.gifts.titleOffAccount')}</Title>
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
      <GiftHistoryList />
    </Container>
  )
}

const { Container, GiftCard, Title, CardIcon, ConnectWalletIcon } = {
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
    gap: 12px;
    box-shadow: ${({ theme }) => theme.shadow[100]};

    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.color.white};
  `,
  CardIcon: styled.header`
    width: 100%;
    height: 237px;
    background: red;
  `,
  Title: styled.span`
    font-size: ${({ theme }) => theme.font.size[16]};
    text-align: center;
    font-weight: 500;
  `,
  ConnectWalletIcon: styled(PiArrowLineRight)`
    font-size: 16px;
  `
}
