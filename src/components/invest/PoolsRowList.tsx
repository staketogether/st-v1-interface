import PoolFilterIcon from '@/components/invest/PoolFilterIcon'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import usePoolTypeTranslation from '@/hooks/usePoolTypeTranslation'
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
    <Row href={`/invest/deposit/${poolAddress}`}>
      <Name>
        <EnsAvatar size={24} address={poolAddress} />
        <EnsName address={poolAddress} />
      </Name>
      <TypeContainer>
        {type && PoolFilterIcon({ iconSize: 14, value: type })}
        <Text>{`${type && poolTypeTranslation(type)}`}</Text>
      </TypeContainer>
      <Text>{members.toString()}</Text>
      <Text>
        {truncateWei(staked, 6)}
        <Text className='purple'>{t('eth.symbol')}</Text>
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
    gap: ${({ theme }) => theme.size[12]};
  `,
  TypeContainer: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
    color: ${({ theme }) => theme.colorV2.blue[1]};

    span {
      color: ${({ theme }) => theme.colorV2.blue[1]};
    }
  `,
  Text: styled.span`
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.colorV2.gray[1]};

    display: flex;
    gap: ${({ theme }) => theme.size[4]};

    &.purple {
      color: ${({ theme }) => theme.colorV2.blue[1]};
    }
  `
}
