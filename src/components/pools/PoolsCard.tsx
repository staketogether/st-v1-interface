import { truncateWei } from '@/services/truncate'

import { AiFillCheckCircle } from 'react-icons/ai'
import styled from 'styled-components'
import useTranslation from '../../hooks/useTranslation'
import EnsAvatar from '../shared/ens/EnsAvatar'
import EnsName from '../shared/ens/EnsName'
import usePoolTypeTranslation from '@/hooks/usePoolTypeTranslation'
import Link from 'next/link'
import handlePoolTypeIcon from '@/services/handlePoolTypeIcon'

type PoolsCardProps = {
  poolAddress: `0x${string}`
  members: bigint
  staked: bigint
  type?: string
}

export default function PoolsCard({ poolAddress, members, staked, type }: PoolsCardProps) {
  const { poolTypeTranslation } = usePoolTypeTranslation()
  const { t } = useTranslation()

  return (
    <Card href={`/pools/deposit/${poolAddress}`}>
      <CardHeader>
        <EnsAvatar size={26} address={poolAddress} />
        <Verified>
          <EnsName large address={poolAddress} />
          <VerifiedIcon fontSize={16} />
        </Verified>
      </CardHeader>
      <CardInfo>
        <div>
          <div>{t('v2.pools.list.type')}</div>
          <div>
            {type && handlePoolTypeIcon({ iconSize: 14, value: type })}
            <div>{`${type && poolTypeTranslation(type)}`}</div>
          </div>
        </div>
        <div>
          <div>{t('v2.pools.list.people')}</div>
          <div>{members.toString()}</div>
        </div>
        <div>
          <div>{t('v2.pools.list.invested')}</div>
          <div>
            {truncateWei(staked, 6)}
            <span>{t('lsd.symbol')}</span>
          </div>
        </div>
      </CardInfo>
    </Card>
  )
}

const { Card, CardInfo, CardHeader, Verified, VerifiedIcon } = {
  Card: styled(Link)`
    display: grid;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};

    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.whiteAlpha[600]};
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
  VerifiedIcon: styled(AiFillCheckCircle)`
    color: ${({ theme }) => theme.color.secondary};
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
        color: ${({ theme }) => theme.color.primary};

        span {
          color: ${({ theme }) => theme.color.secondary};
        }
      }
    }
  `,
  Verified: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
  `
}
