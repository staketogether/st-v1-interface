import React from 'react'
import { AiOutlineLink } from 'react-icons/ai'
import styled from 'styled-components'
import { DateTime } from 'luxon'
import { useRouter } from 'next/router'
import { truncateWei } from '@/services/truncate'
import useTranslation from '@/hooks/useTranslation'
import Link from 'next/link'
import chainConfig from '@/config/chain'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import StakeEmptyPoolInfo from './StakeEmptyPoolInfo'
import { ActivitiesPool } from '@/types/ActivitiesPool'

type StakeActivityProps = {
  poolActivities: ActivitiesPool[]
  isLoading: boolean
}
export default function StakeActivity({ poolActivities, isLoading }: StakeActivityProps) {
  const router = useRouter()
  const { t } = useTranslation()
  const { blockExplorer } = chainConfig()
  return (
    <Container>
      {!isLoading && (
        <>
          {!!poolActivities.length && (
            <header>
              <span>{t('time')}</span>
              <span>{t('type')}</span>
              <span>{t('value')}</span>
              <span>{t('tx')}</span>
            </header>
          )}
          <>
            {poolActivities.length ? (
              poolActivities.map(activity => {
                const formatTimestamp = activity.timestamp
                  ? DateTime.fromSeconds(Number(activity.timestamp)).toRelative({
                      locale: router.locale === 'en' ? 'en-US' : router.locale
                    }) || ''
                  : ''
                return (
                  <Row key={activity.txHash}>
                    <span>{formatTimestamp}</span>
                    <span>{t(`v2.activities.${activity.type}`)}</span>
                    <span className={`${activity.type.includes('deposit') ? 'green' : 'red'}`}>{`${truncateWei(
                      activity.amount,
                      4
                    )} ${t('eth.symbol')}`}</span>
                    <Link href={`${blockExplorer.baseUrl}/tx/${activity.txHash}`} target='_blank'>
                      <ExternalLink />
                    </Link>
                  </Row>
                )
              })
            ) : (
              <StakeEmptyPoolInfo message={t('v2.stake.infoEmptyState')} />
            )}
          </>
        </>
      )}
      {isLoading && (
        <>
          <SkeletonLoading height={32} borderRadius='99px' />
          <SkeletonLoading height={32} borderRadius='99px' />
          <SkeletonLoading height={32} borderRadius='99px' />
        </>
      )}
    </Container>
  )
}

const { Container, Row, ExternalLink } = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    > header {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 30px;
      padding: ${({ theme }) => theme.size[8]};
      > span {
        color: ${({ theme }) => theme.color.blackAlpha[600]};
        font-size: ${({ theme }) => theme.font.size[14]};
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
    }
  `,
  Row: styled.div`
    padding: 0px 8px;
    height: 32px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 30px;
    align-items: center;

    border-radius: 99px;
    background: ${({ theme }) => theme.color.whiteAlpha[500]};

    > span {
      color: ${({ theme }) => theme.color.blackAlpha[700]};
      font-size: ${({ theme }) => theme.font.size[14]};
      font-style: normal;
      font-weight: 500;
      line-height: normal;

      &.green {
        color: ${({ theme }) => theme.color.green[500]};
      }

      &.red {
        color: ${({ theme }) => theme.color.red[500]};
      }
    }
  `,
  ExternalLink: styled(AiOutlineLink)`
    font-size: ${({ theme }) => theme.font.size[16]};
    color: ${({ theme }) => theme.color.secondary};
  `
}
