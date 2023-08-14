import useTranslation from '@/hooks/useTranslation'
import React from 'react'
import styled from 'styled-components'
import { truncateWei } from '@/services/truncate'
import { AccountActivity } from '@/types/AccountActivity'
import { DateTime } from 'luxon'
import { useRouter } from 'next/router'
import chainConfig from '@/config/chain'
import Link from 'next/link'
import { AiOutlineLink } from 'react-icons/ai'

type WalletSidebarActivities = {
  accountActivities: AccountActivity[]
}

export default function WalletSidebarActivities({ accountActivities }: WalletSidebarActivities) {
  const { t } = useTranslation()
  const router = useRouter()
  const { blockExplorer } = chainConfig()

  return (
    <Container>
      {accountActivities.length === 0 && (
        <header>
          <span>{t('noActivities')}</span>
        </header>
      )}
      {accountActivities.length > 0 && (
        <ActivitiesHeader>
          <span>{t('time')}</span>
          <span>{t('type')}</span>
          <span>{t('value')}</span>
          <span>{t('tx')}</span>
        </ActivitiesHeader>
      )}
      {accountActivities.map(activity => {
        const formatTimestamp = activity.timestamp
          ? DateTime.fromSeconds(Number(activity.timestamp)).toRelative({
              locale: router.locale === 'en' ? 'en-US' : router.locale
            }) || ''
          : ''
        return (
          <Activity key={activity.txHash}>
            <span>{formatTimestamp}</span>
            <span>{t(`v2.activities.${activity.type}`)}</span>
            <span className={`${activity.type.includes('deposit') ? 'green' : 'red'}`}>
              {`${truncateWei(BigInt(activity.amount))} ${t('eth.symbol')}`}
            </span>
            <Link href={`${blockExplorer.baseUrl}/tx/${activity.txHash}`} target='_blank'>
              <ExternalLink />
            </Link>
          </Activity>
        )
      })}
    </Container>
  )
}

const { Container, Activity, ActivitiesHeader, ExternalLink } = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[4]};
    margin-top: ${({ theme }) => theme.size[16]};

    > header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    span {
      font-size: ${({ theme }) => theme.font.size[12]};
      font-style: normal;
      line-height: normal;

      &.green {
        color: ${({ theme }) => theme.color.green[500]};
      }

      &.red {
        color: ${({ theme }) => theme.color.red[500]};
      }
    }
  `,
  ActivitiesHeader: styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr 30px;
    padding: 0px 4px;
    span {
      color: ${({ theme }) => theme.color.blackAlpha[600]};
      font-weight: 500;
    }
  `,
  Activity: styled.div`
    height: 32px;
    border-radius: 99px;
    background: ${({ theme }) => theme.color.blackAlpha[50]};
    padding: 0px 4px;

    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr 30px;
    span {
      color: ${({ theme }) => theme.color.blackAlpha[700]};
      font-weight: 400;
    }
  `,
  ExternalLink: styled(AiOutlineLink)`
    font-size: ${({ theme }) => theme.font.size[16]};
    color: ${({ theme }) => theme.color.secondary};
  `
}
