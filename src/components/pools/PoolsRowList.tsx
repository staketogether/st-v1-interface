import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import usePoolTypeTranslation from '@/hooks/usePoolTypeTranslation'
import handlePoolTypeIcon from '@/services/handlePoolTypeIcon'
import { truncateWei } from '@/services/truncate'
import Link from 'next/link'
import { styled } from 'styled-components'
import EnsAvatar from '../shared/ens/EnsAvatar'
import EnsName from '../shared/ens/EnsName'

type PoolsRowListProps = {
  poolAddress: `0x${string}`
  members: bigint
  staked: bigint
  type?: string
}

export default function PoolsRowList({ poolAddress, members, staked, type }: PoolsRowListProps) {
  const { poolTypeTranslation } = usePoolTypeTranslation()
  const { t } = useLocaleTranslation()
  return (
    <Row href={`/pools/deposit/${poolAddress}`}>
      <Name>
        <EnsAvatar size={24} address={poolAddress} />
        <EnsName address={poolAddress} />
      </Name>
      <TypeContainer>
        {type && handlePoolTypeIcon({ iconSize: 14, value: type })}
        <Text>{`${type && poolTypeTranslation(type)}`}</Text>
      </TypeContainer>
      <Text>{members.toString()}</Text>
      <Text>
        {truncateWei(staked, 6)}
        <Text className='purple'>{t('lsd.symbol')}</Text>
      </Text>
    </Row>
  )
}

const { Row, Name, TypeContainer, Text } = {
  Row: styled(Link)`
    display: none;
    height: 48px;
    grid-template-columns: 1fr 0.8fr 0.8fr 1fr;
    padding-left: 16px;
    gap: 8px;
    align-items: center;

    border-radius: ${({ theme }) => theme.size[16]};
    background: ${({ theme }) => theme.color.whiteAlpha[400]};

    &:hover {
      background: ${({ theme }) => theme.color.whiteAlpha[700]};

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
    gap: ${({ theme }) => theme.size[12]};
  `,
  TypeContainer: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};

    color: ${({ theme }) => theme.color.primary};
  `,
  Text: styled.span`
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};

    display: flex;
    gap: ${({ theme }) => theme.size[4]};

    &.purple {
      color: ${({ theme }) => theme.color.secondary};
    }
  `
}
