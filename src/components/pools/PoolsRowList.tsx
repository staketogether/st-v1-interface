import { truncateWei } from '@/services/truncate'
import Link from 'next/link'
import styled from 'styled-components'
import useTranslation from '../../hooks/useTranslation'
import EnsAvatar from '../shared/ens/EnsAvatar'
import EnsName from '../shared/ens/EnsName'
import { PoolsType } from '@/types/Pool'
import handlePoolTypeIcon from '@/services/handlePoolTypeIcon'
import usePoolTypeTranslation from '@/hooks/usePoolTypeTranslation'

type PoolsRowListProps = {
  poolAddress: `0x${string}`
  members: bigint
  staked: bigint
  type: PoolsType
}

export default function PoolsRowList({ poolAddress, members, staked, type }: PoolsRowListProps) {
  const { t } = useTranslation()
  const { poolTypeTranslation } = usePoolTypeTranslation()

  return (
    <Link href={`/pools/deposit/${poolAddress}`}>
      <Row>
        <Name>
          <EnsAvatar size={24} address={poolAddress} />
          <EnsName address={poolAddress} />
        </Name>
        <TypeContainer>
          <Text>{`${poolTypeTranslation(type)}`}</Text>
          {handlePoolTypeIcon({ iconSize: 14, value: type })}
        </TypeContainer>
        <Text>{members.toString()}</Text>
        <Text>{truncateWei(staked, 6)} ETH</Text>
        <CTA>{t('v2.pools.list.invest')}</CTA>
      </Row>
    </Link>
  )
}

const { Row, Name, TypeContainer, Text, CTA } = {
  Row: styled.div`
    display: grid;
    height: 48px;
    grid-template-columns: 1fr 0.8fr 0.8fr 0.8fr 112px;
    padding-left: 16px;
    gap: 8px;
    align-items: center;

    border-radius: ${({ theme }) => theme.size[16]};
    background: ${({ theme }) => theme.color.whiteAlpha[500]};

    &:hover {
      background: ${({ theme }) => theme.color.whiteAlpha[700]};

      > button {
        background-color: ${({ theme }) => theme.color.secondary};
      }
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

    &.secondary {
      color: ${({ theme }) => theme.color.secondary};
    }
  `,
  CTA: styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    width: 100px;
    gap: 8px;
    padding: 0px ${({ theme }) => theme.size[12]};

    border-radius: ${({ theme }) => theme.size[16]};
    background: ${({ theme }) => theme.color.whiteAlpha[500]};
    box-shadow: ${({ theme }) => theme.shadow[100]};

    border: none;

    font-size: ${({ theme }) => theme.font.size[14]};
    font-weight: 300;

    background: ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.white};
    transition: background-color 0.2s ease;

    &:hover {
      background-color: ${({ theme }) => theme.color.secondary};
    }
  `
}
