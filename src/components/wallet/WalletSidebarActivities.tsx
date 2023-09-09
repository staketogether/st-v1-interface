import chainConfig from '@/config/chain'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { truncateTimestamp, truncateWei } from '@/services/truncate'
import { AccountActivity } from '@/types/AccountActivity'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineLink } from 'react-icons/ai'
import styled from 'styled-components'

type WalletSidebarActivities = {
  accountActivities: AccountActivity[]
}

export default function WalletSidebarActivities({ accountActivities }: WalletSidebarActivities) {
  const { t } = useLocaleTranslation()
  const router = useRouter()
  const { blockExplorer } = chainConfig()
  const getLocale = () => {
    return router.locale === 'en' ? 'en-US' : 'pt-BR'
  }

  return (
    <Container>
      {accountActivities.length === 0 && (
        <EmptyContainer>
          <span>{t('noActivities')}</span>
        </EmptyContainer>
      )}
      {accountActivities.length > 0 && (
        <ActivitiesHeader>
          <span>{t('tx')}</span>
          <span>{t('time')}</span>
          <span>{t('type')}</span>
          <span>{t('value')}</span>
        </ActivitiesHeader>
      )}
      {accountActivities.map(activity => {
        return (
          <Row key={activity.txHash} href={`${blockExplorer.baseUrl}/tx/${activity.txHash}`} target='_blank'>
            <span>
              <ExternalLink />
            </span>
            <span>{truncateTimestamp(activity.timestamp, getLocale())}</span>
            <span className='purple'>{t(`v2.activities.${activity.type}`)}</span>

            <span className={`${activity.type.includes('deposit') ? 'green' : 'red'}`}>
              {`${truncateWei(BigInt(activity.amount), 5)} ${t('eth.symbol')}`}
            </span>
          </Row>
        )
      })}
    </Container>
  )
}

const { Container, Row, ActivitiesHeader, ExternalLink, EmptyContainer } = {
  Container: styled.div`
    display: flex;
    flex-direction: column;

    padding: 8px;

    > header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    span {
      font-size: ${({ theme }) => theme.font.size[12]};

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
    display: none;
    grid-template-columns: 0.3fr 1fr 0.9fr 0.9fr;
    padding: 8px;

    padding-bottom: 12px;

    > span {
      font-size: 13px;
      color: ${({ theme }) => theme.colorV2.gray[1]};
    }
  `,
  Row: styled(Link)`
    cursor: pointer;

    display: grid;
    grid-template-columns: 0.3fr 0.9fr 0.9fr 0.9fr;
    align-items: center;
    padding: 8px;

    &:hover {
      background: ${({ theme }) => theme.colorV2.gray[2]};
      border-radius: 8px;
      box-shadow: ${({ theme }) => theme.shadow[100]};
    }

    span {
      color: ${({ theme }) => theme.color.primary};
      font-size: 13px;

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
