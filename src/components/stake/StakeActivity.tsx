import chainConfig from '@/config/chain'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { truncateWei } from '@/services/truncate'
import { ActivitiesPool } from '@/types/ActivitiesPool'
import { DateTime } from 'luxon'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineLink } from 'react-icons/ai'
import styled from 'styled-components'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import StakeEmptyPoolInfo from './StakeEmptyPoolInfo'

type StakeActivityProps = {
  poolActivities: ActivitiesPool[]
  isLoading: boolean
}
export default function StakeActivity({ poolActivities, isLoading }: StakeActivityProps) {
  const router = useRouter()
  const { t } = useLocaleTranslation()
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
                  <Row
                    key={activity.txHash}
                    href={`${blockExplorer.baseUrl}/tx/${activity.txHash}`}
                    target='_blank'
                  >
                    <span>{formatTimestamp}</span>
                    <span className='purple'>{t(`v2.activities.${activity.type}`)}</span>
                    <span
                      className={`${activity.amount > 1n && 'green'} ${activity.amount < 0 && 'red'}`}
                    >{`${truncateWei(activity.amount, 6)} ${t('eth.symbol')}`}</span>

                    <ExternalLink />
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
          <SkeletonLoading height={32} $borderRadius='8px' />
          <SkeletonLoading height={32} $borderRadius='8px' />
          <SkeletonLoading height={32} $borderRadius='8px' />
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
        color: ${({ theme }) => theme.color.blue[500]};
        font-size: ${({ theme }) => theme.font.size[14]};

        font-weight: 500;
      }
    }
  `,
  Row: styled(Link)`
    cursor: pointer;
    padding: 0px 8px;
    padding-right: 8px;
    padding-left: 14px;
    height: 32px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 30px;
    align-items: center;

    border-radius: 8px;

    span {
      color: ${({ theme }) => theme.color.primary};
      font-size: ${({ theme }) => theme.font.size[14]};

      font-weight: 500;

      &.purple {
        color: ${({ theme }) => theme.color.secondary};
      }

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
