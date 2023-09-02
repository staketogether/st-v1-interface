import PoolFilterIcon from '@/components/invest/PoolFilterIcon'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import usePoolTypeTranslation from '@/hooks/usePoolTypeTranslation'
import { truncateWei } from '@/services/truncate'
import { Pool } from '@/types/Pool'
import Link from 'next/link'
import { styled } from 'styled-components'
import CommunityLogo from '../shared/community/CommunityLogo'
import CommunityName from '../shared/community/CommunityName'

type PoolsRowListProps = {
  pool: Pool
}

export default function PoolsRowList({ pool }: PoolsRowListProps) {
  const { poolTypeTranslation } = usePoolTypeTranslation()
  const { t } = useLocaleTranslation()
  return (
    <Row href={`/invest/deposit/${pool.address}`}>
      <Name>
        <CommunityLogo size={24} src={pool.logo.url} alt={pool.logo.fileName} />
        <CommunityName name={pool.name} />
      </Name>
      <TypeContainer>
        {pool.type && PoolFilterIcon({ iconSize: 14, value: pool.type })}
        <Text>{`${pool.type && poolTypeTranslation(pool.type)}`}</Text>
      </TypeContainer>
      <Text>{pool.receivedDelegationsCount.toString()}</Text>
      <Text className='blue'>
        {truncateWei(pool.poolBalance, 6)}
        <Text className='blue'>{t('eth.symbol')}</Text>
      </Text>
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
  `
}
