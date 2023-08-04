import React from 'react'
import styled from 'styled-components'
import EnsAvatar from '../shared/ens/EnsAvatar'
import EnsName from '../shared/ens/EnsName'
import { AiFillCheckCircle, AiOutlineBarChart } from 'react-icons/ai'
import { truncateWei } from '@/services/truncate'

type PoolsRowListProps = {
  rankPosition: number
  poolAddress: `0x${string}`
  members: bigint
  staked: bigint
}

export default function PoolsRowList({ poolAddress, members, staked, rankPosition }: PoolsRowListProps) {
  return (
    <Row>
      <RankPosition>{rankPosition}</RankPosition>
      <CardImage>
        <EnsAvatar size={26} address={poolAddress} />
        <EnsName large address={poolAddress} />
        <VerifiedIcon fontSize={14} />
      </CardImage>
      <TypeContainer>
        <CommunityIcon />
        <Text>Community</Text>
      </TypeContainer>
      <Text>{members.toString()}</Text>
      <Text>{truncateWei(staked, 6)}</Text>
      <button>Investir</button>
    </Row>
  )
}

const { Row, CardImage, VerifiedIcon, RankPosition, TypeContainer, Text, CommunityIcon } = {
  Row: styled.div`
    display: grid;
    height: 56px;
    grid-template-columns: 60px 320px 1fr 1fr 1fr 92px;
    padding-left: 12px;
    gap: 8px;
    align-items: center;

    border-radius: ${({ theme }) => theme.size[12]};
    background: ${({ theme }) => theme.color.whiteAlpha[500]};
    > button {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 32px;
      width: 80px;
      padding: 0px ${({ theme }) => theme.size[12]};

      border-radius: ${({ theme }) => theme.size[8]};
      background: ${({ theme }) => theme.color.whiteAlpha[500]};
      box-shadow: ${({ theme }) => theme.shadow[100]};

      border: none;

      font-size: ${({ theme }) => theme.font.size[12]};
      font-style: normal;
      font-weight: 500;
      line-height: normal;

      background: ${({ theme }) => theme.color.primary};
      color: ${({ theme }) => theme.color.white};
      transition: background-color 0.2s ease;

      &:hover,
      &.active {
        background: ${({ theme }) => theme.color.blue[600]};
      }
    }
  `,
  CardImage: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
  `,
  VerifiedIcon: styled(AiFillCheckCircle)`
    color: ${({ theme }) => theme.color.secondary};
  `,
  RankPosition: styled.span`
    font-size: ${({ theme }) => theme.font.size[14]};
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: ${({ theme }) => theme.color.primary};
    text-align: center;
  `,
  TypeContainer: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
  `,
  CommunityIcon: styled(AiOutlineBarChart)`
    font-size: ${({ theme }) => theme.font.size[24]};
    color: ${({ theme }) => theme.color.secondary};
  `,
  Text: styled.span`
    font-size: ${({ theme }) => theme.font.size[16]};
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: ${({ theme }) => theme.color.primary};

    &.secondary {
      color: ${({ theme }) => theme.color.secondary};
    }
  `
}
