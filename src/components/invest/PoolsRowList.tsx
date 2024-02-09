import PoolFilterIcon from '@/components/invest/PoolFilterIcon'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import usePoolTypeTranslation from '@/hooks/usePoolTypeTranslation'
import { truncateWei } from '@/services/truncate'
import { Pool } from '@/types/Pool'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { formatNumberByLocale } from '../../services/format'
import CommunityLogo from '../shared/community/CommunityLogo'
import CommunityName from '../shared/community/CommunityName'
import SkeletonLoading from '../shared/icons/SkeletonLoading'

type PoolsRowListProps = {
  pool: Pool
  loading: boolean
}

export default function PoolsRowList({ pool, loading }: PoolsRowListProps) {
  const { poolTypeTranslation } = usePoolTypeTranslation()
  const { t } = useLocaleTranslation()
  const { query, locale } = useRouter()
  const { currency, network } = query

  return (
    <Row href={`/${network}/${currency}/pools/deposit/${pool.address}`}>
      {pool && (
        <>
          <Name>
            {pool.logo.url && (
              <CommunityLogo size={24} src={pool.logo.url} alt={pool.logo.fileName} loading={loading} />
            )}
            {!pool.logo.url && (
              <CommunityLogo size={24} src={pool.logo.url} alt={pool.logo.fileName} loading={true} />
            )}
            {pool.name && <CommunityName name={pool.name} loading={loading} />}
            {!pool.name && <CommunityName name={pool.name} loading={true} />}
          </Name>
          <TypeContainer>
            {!pool.type && <SkeletonLoading width={100} height={15} />}
            {pool.type && PoolFilterIcon({ iconSize: 16, value: pool.type })}
            <Text>{`${pool.type && poolTypeTranslation(pool.type)}`}</Text>
          </TypeContainer>
          <Text>{formatNumberByLocale(pool.receivedDelegationsCount.toString(), locale)}</Text>
          <Text className='blue'>
            {formatNumberByLocale(truncateWei(pool.poolBalance, 6), locale)}
            <Text className='blue'>{t('eth.symbol')}</Text>
          </Text>
        </>
      )}
    </Row>
  )
}

const { Row, Name, TypeContainer, Text } = {
  Row: styled(Link)`
    display: none;
    height: 48px;
    grid-template-columns: 0.9fr 0.7fr 0.5fr 0.7fr;
    gap: 8px;
    align-items: center;
    background: ${({ theme }) => theme.color.white};
    padding: 8px 16px;
    box-shadow: ${({ theme }) => theme.shadow[100]};
    border-radius: 8px;

    &:hover {
      background: ${({ theme }) => theme.color.whiteAlpha[700]};
      box-shadow: ${({ theme }) => theme.shadow[100]};

      > button {
        background-color: ${({ theme }) => theme.color.secondary};
      }
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      display: grid;
    }
  `,
  Name: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[16]};
    font-weight: 500;
  `,
  TypeContainer: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
    color: ${({ theme }) => theme.colorV2.gray[1]};

    span {
      color: ${({ theme }) => theme.colorV2.gray[1]};
    }
  `,
  Text: styled.span`
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.colorV2.gray[1]};

    display: flex;
    gap: ${({ theme }) => theme.size[4]};

    &.blue {
      color: ${({ theme }) => theme.colorV2.blue[3]};
    }
    &.green {
      color: ${({ theme }) => theme.color.green[500]};
    }
  `
}
