import PoolFilterIcon from '@/components/invest/PoolFilterIcon'
import usePoolTypeTranslation from '@/hooks/usePoolTypeTranslation'
import { truncateWei } from '@/services/truncate'
import Link from 'next/link'
import { styled } from 'styled-components'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'

import { Pool } from '@/types/Pool'
import CommunityLogo from '../shared/community/CommunityLogo'
import CommunityName from '../shared/community/CommunityName'

type PoolsCardProps = {
  pool: Pool
}

export default function PoolsCard({ pool }: PoolsCardProps) {
  const { poolTypeTranslation } = usePoolTypeTranslation()
  const { t } = useLocaleTranslation()

  return (
    <Card href={`/invest/deposit/${pool.address}`}>
      <CardHeader>
        <CommunityLogo size={26} src={pool.logo.url} alt={pool.logo.fileName} />
        <CommunityName name={pool.name} />
      </CardHeader>
      <CardInfo>
        <div>
          <div>{t('v2.pools.list.type')}</div>
          <div>
            {pool.type && PoolFilterIcon({ iconSize: 14, value: pool.type })}
            <div>{`${pool.type && poolTypeTranslation(pool.type)}`}</div>
          </div>
        </div>
        <div>
          <div>{t('v2.pools.list.people')}</div>
          <div>{pool.receivedDelegationsCount.toString()}</div>
        </div>
        <div>
          <div>{t('v2.pools.list.invested')}</div>
          <div>
            {truncateWei(pool.poolBalance, 6)}
            <span>{t('lsd.symbol')}</span>
          </div>
        </div>
      </CardInfo>
    </Card>
  )
}

const { Card, CardInfo, CardHeader } = {
  Card: styled(Link)`
    display: grid;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};

    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.white};
    border: none;
    border-radius: ${({ theme }) => theme.size[16]};
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
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
    div {
      display: flex;
      align-items: center;
    }
  `,
  CardInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};
    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: ${({ theme }) => theme.size[4]};

      > div:first-child {
        font-size: ${({ theme }) => theme.font.size[14]};
        color: ${({ theme }) => theme.color.primary};
      }
      > div:last-child {
        font-size: ${({ theme }) => theme.font.size[14]};
        color: ${({ theme }) => theme.colorV2.blue[1]};
      }
    }
  `
}
