import chainConfig from '@/config/chain'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { truncateWei } from '@/services/truncate'
import { AccountActivity } from '@/types/AccountActivity'
import { DateTime } from 'luxon'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineLink } from 'react-icons/ai'
import { styled } from 'styled-components'

type WalletSidebarActivities = {
  accountActivities: AccountActivity[]
}

export default function WalletSidebarActivities({ accountActivities }: WalletSidebarActivities) {
  const { t } = useLocaleTranslation()
  const router = useRouter()
  const { blockExplorer } = chainConfig()
  return (
    <Container>
      {accountActivities.length === 0 && (
        <EmptyContainer>
          <span>{t('noActivities')}</span>
        </EmptyContainer>
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
          <Activity
            key={activity.txHash}
            href={`${blockExplorer.baseUrl}/tx/${activity.txHash}`}
            target='_blank'
          >
            <span>{formatTimestamp}</span>
            <span className='purple'>{t(`v2.activities.${activity.type}`)}</span>
            <span className={`${activity.type.includes('deposit') ? 'green' : 'red'}`}>
              {`${truncateWei(BigInt(activity.amount))} ${t('eth.symbol')}`}
            </span>

            <ExternalLink />
          </Activity>
        )
      })}
    </Container>
  )
}

const { Container, Activity, ActivitiesHeader, ExternalLink, EmptyContainer } = {
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
      &.green {
        color: ${({ theme }) => theme.color.green[500]};
      }

      &.red {
        color: ${({ theme }) => theme.color.red[500]};
      }
    }
  `,
  EmptyContainer: styled.div`
    span {
      width: 100%;
      text-align: center;
    }
  `,

  ActivitiesHeader: styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr 30px;
    padding: 0px 4px;
    span {
      color: ${({ theme }) => theme.color.blue[500]};
      font-weight: 500;
    }
  `,
  Activity: styled(Link)`
    height: 32px;
    border-radius: 99px;
    cursor: pointer;
    background: ${({ theme }) => theme.color.whiteAlpha[500]};
    &:hover {
      background: ${({ theme }) => theme.color.whiteAlpha[800]};
    }
    padding: 0px 4px;

    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr 30px;
    span {
      color: ${({ theme }) => theme.color.primary};
      font-weight: 400;
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
