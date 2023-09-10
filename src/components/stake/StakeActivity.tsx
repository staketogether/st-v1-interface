import chainConfig from '@/config/chain'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { truncateAddress, truncateTimestamp, truncateWei } from '@/services/truncate'
import { PoolActivity } from '@/types/PoolActivity'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineLink } from 'react-icons/ai'
import styled from 'styled-components'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import StakeEmptyPoolInfo from './StakeEmptyPoolInfo'

type StakeActivityProps = {
  poolActivities: PoolActivity[]
  isLoading: boolean
}

export default function StakeActivity({ poolActivities, isLoading }: StakeActivityProps) {
  const router = useRouter()
  const { t } = useLocaleTranslation()
  const { blockExplorer } = chainConfig()
  const hasActivities = poolActivities.length > 0

  if (isLoading) {
    return (
      <Container>
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <SkeletonLoading key={index} height={32} $borderRadius='8px' />
          ))}
      </Container>
    )
  }

  const getLocale = () => {
    return router.locale === 'en' ? 'en-US' : 'pt-BR'
  }

  return (
    <Container>
      {hasActivities && (
        <header>
          <span>{t('tx')}</span>
          <span>{t('time')}</span>
          <span>{t('account')}</span>
          <span>{t('type')}</span>
          <span>{t('value')}</span>
        </header>
      )}
      <List>
        {hasActivities ? (
          poolActivities.map(activity => {
            return (
              <Row
                key={activity.txHash}
                href={`${blockExplorer.baseUrl}/tx/${activity.txHash}`}
                target='_blank'
              >
                <span>
                  <ExternalLink />
                </span>
                <span>{truncateTimestamp(activity.timestamp, getLocale())}</span>
                <span className='purple'>{truncateAddress(activity.account.address, 3)}</span>
                <span className='purple'>{t(`v2.activities.${activity.type}`)}</span>
                <span className={`${activity.amount > 1n && 'green'} ${activity.amount < 0 && 'red'}`}>
                  {`${truncateWei(activity.amount, 6)} ${t('eth.symbol')}`}
                </span>
              </Row>
            )
          })
        ) : (
          <StakeEmptyPoolInfo message={t('v2.stake.infoEmptyState')} />
        )}
      </List>
    </Container>
  )
}

const { Container, Row, ExternalLink, List } = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    > header {
      display: grid;
      grid-template-columns: 0.3fr 0.9fr 0.9fr 0.9fr 1fr;
      padding: 0 8px;
      text-align: center;
      @media (min-width: 768px) {
        text-align: justify;
      }

      > span {
        font-size: ${({ theme }) => theme.font.size[14]};
        color: ${({ theme }) => theme.colorV2.gray[1]};
      }
    }
  `,
  List: styled.div`
    display: grid;
    gap: 4px;
  `,
  Row: styled(Link)`
    cursor: pointer;

    display: grid;
    grid-template-columns: 0.3fr 0.9fr 0.9fr 0.9fr 1fr;
    align-items: center;
    padding: ${({ theme }) => theme.size[8]} 0;
    text-align: center;
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      padding: ${({ theme }) => theme.size[8]};
      text-align: justify;
    }

    &:hover {
      background: ${({ theme }) => theme.colorV2.gray[2]};
      border-radius: 8px;
      box-shadow: ${({ theme }) => theme.shadow[100]};
    }

    span {
      color: ${({ theme }) => theme.color.primary};
      font-size: ${({ theme }) => theme.font.size[14]};

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
    color: ${({ theme }) => theme.colorV2.blue[1]};
  `
}
