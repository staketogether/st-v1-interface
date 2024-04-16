import { chainConfigByChainId } from '@/config/chain'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { truncateTimestamp, truncateWei } from '@/services/truncate'
import { AccountActivity } from '@/types/AccountActivity'
import { ProductStaking } from '@/types/ProductStaking'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PiLink } from 'react-icons/pi'
import styled from 'styled-components'
import { formatNumberByLocale } from '../../services/format'

type WalletSidebarActivities = {
  accountActivities: AccountActivity[]
  product: ProductStaking
}

export default function WalletSidebarActivities({ accountActivities, product }: WalletSidebarActivities) {
  const { t } = useLocaleTranslation()
  const { locale } = useRouter()
  const { blockExplorer } = chainConfigByChainId(product.chainIdNetworkAvailable)
  const getLocale = () => {
    return locale === 'en' ? 'en-US' : 'pt-BR'
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
            <span className={`${activity.type} purple`}>{t(`v2.activities.${activity.type}`)}</span>
            {activity.type != 'airdropClaim' && (
              <span className={`${activity.type.includes('deposit') ? 'green' : 'red'}`}>
                {`${formatNumberByLocale(truncateWei(BigInt(activity.amount), 5), locale)} ${t('eth.symbol')}`}
              </span>
            )}
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
    gap: 16px;

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
    text-align: center;
    padding: 8px;
    span {
      width: 100%;
      text-align: center;
    }
  `,
  ActivitiesHeader: styled.div`
    display: grid;
    display: none;
    grid-template-columns: 0.3fr 1fr 0.9fr 1fr;
    padding: 8px;

    padding-bottom: 12px;

    > span {
      font-size: 13px;
      color: ${({ theme }) => theme.colorV2.gray[1]};
    }
  `,
  Row: styled(Link)`
    cursor: pointer;

    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
      background: ${({ theme }) => theme.colorV2.gray[2]};
      border-radius: 8px;
      box-shadow: ${({ theme }) => theme.shadow[100]};
    }

    span {
      color: ${({ theme }) => theme.color.primary};
      font-size: 13px;
      display: flex;
      align-items: center;

      &:nth-child(2) {
        width: 90px;
      }

      &.purple {
        color: ${({ theme }) => theme.color.secondary};
      }

      &.airdropClaim {
        border-radius: 99px;
        background: ${({ theme }) => theme.colorV2.purple[1]};
        color: ${({ theme }) => theme.colorV2.white};
        padding: ${({ theme }) => theme.size[4]};
      }

      &.green {
        color: ${({ theme }) => theme.color.green[500]};
      }

      &.red {
        color: ${({ theme }) => theme.color.red[500]};
      }
    }

    > span:last-of-type {
      margin-left: auto;
    }
  `,
  ExternalLink: styled(PiLink)`
    font-size: ${({ theme }) => theme.font.size[16]};
    color: ${({ theme }) => theme.color.secondary};
  `
}
