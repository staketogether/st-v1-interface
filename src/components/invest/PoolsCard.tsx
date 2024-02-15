import PoolFilterIcon from '@/components/invest/PoolFilterIcon'
import usePoolTypeTranslation from '@/hooks/usePoolTypeTranslation'
import { truncateWei } from '@/services/truncate'
import Link from 'next/link'
import styled from 'styled-components'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'

import { Pool } from '@/types/Pool'
import { useRouter } from 'next/router'
import CommunityLogo from '../shared/community/CommunityLogo'
import CommunityName from '../shared/community/CommunityName'

type PoolsCardProps = {
  pool: Pool
  loading: boolean
}

export default function PoolsCard({ pool, loading }: PoolsCardProps) {
  const { poolTypeTranslation } = usePoolTypeTranslation()
  const { t } = useLocaleTranslation()
  const { query } = useRouter()
  const { currency, network } = query

  return (
    <Card href={`/${network}/${currency}/projects/deposit/${pool.address}`}>
      <CardHeader>
        {pool.logo?.url && (
          <CommunityLogo size={24} src={pool.logo.url} alt={pool.logo.fileName} loading={loading} />
        )}
        {!pool.logo?.url && <CommunityLogo size={24} src={''} alt='logo' loading={true} />}
        {pool?.name && <CommunityName name={pool?.name} loading={loading} $bold />}
        {!pool?.name && <CommunityName name={pool?.name} loading={true} />}
        <CommunityType>
          {pool.type && PoolFilterIcon({ iconSize: 16, value: pool.type })}
          <div>{`${pool.type && poolTypeTranslation(pool.type)}`}</div>
        </CommunityType>
      </CardHeader>
      <CardInfo>
        <div>
          <div>{t('v2.pools.list.people')}</div>
          <div>{pool.receivedDelegationsCount.toString()}</div>
        </div>
        <div>
          <div>{t('v2.pools.list.invested')}</div>
          <div className='blue'>
            {truncateWei(pool.poolBalance, 6)}
            <span className='blue'>{t('eth.symbol')}</span>
          </div>
        </div>
      </CardInfo>
    </Card>
  )
}

const { Card, CardInfo, CardHeader, CommunityType } = {
  Card: styled(Link)`
    display: grid;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};

    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.white};
    border: none;
    border-radius: ${({ theme }) => theme.size[8]};
    padding: ${({ theme }) => theme.size[16]};
    transition: background-color 0.1s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};

    &:hover {
      background-color: ${({ theme }) => theme.color.whiteAlpha[700]};
    }

    &.active {
      background-color: ${({ theme }) => theme.color.whiteAlpha[700]};
      color: ${({ theme }) => theme.color.secondary};
    }

    cursor: pointer;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      display: none;
    }
  `,
  CardHeader: styled.div`
    display: grid;
    align-items: center;
    gap: ${({ theme }) => theme.size[12]};
    font-weight: 500;
    grid-template-columns: 26px 1fr auto;

    span {
      font-weight: 500;
    }
  `,
  CardInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: ${({ theme }) => theme.size[4]};

      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.colorV2.gray[1]};

      &.blue {
        color: ${({ theme }) => theme.colorV2.blue[1]};
      }
      &.green {
        color: ${({ theme }) => theme.color.green[500]};
      }
    }
  `,
  CommunityType: styled.div`
    display: inline-flex;
    align-items: center;
    gap: 8px;
  `
}
