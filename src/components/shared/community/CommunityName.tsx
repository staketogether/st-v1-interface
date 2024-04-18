import styled from 'styled-components'

import { truncateAddress, truncateText } from '../../../services/truncate'
import SkeletonLoading from '../icons/SkeletonLoading'

type CommunityNameProps = {
  name?: string
  walletAddress?: `0x${string}`
  loading?: boolean
  $large?: boolean
  $larger?: boolean
  slice?: number
  $color?: string
  $bold?: boolean
}

export default function CommunityName({ name, walletAddress, loading, $large, $larger, slice, $color, $bold }: CommunityNameProps) {
  if (loading && !$larger && !$large) {
    return <SkeletonLoading width={140} height={14} />
  } else if (loading && $large) {
    return <SkeletonLoading width={140} height={15} />
  } else if (name) {
    return (
      <Text color={$color} $large={$large} $larger={$larger} $bold={$bold}>
        {slice ? truncateText(name, slice) : name}
      </Text>
    )
  } else {
    return (
      <Text color={$color} $large={$large} $larger={$larger}>
        {truncateAddress(walletAddress || '', 5)}
      </Text>
    )
  }
}

const { Text } = {
  Text: styled.span<{ $large?: boolean; $larger?: boolean; $color?: string; $bold?: boolean }>`
    font-size: ${({ theme }) => theme.font.size[14]};
    font-weight: 400;
    color: ${({ theme, color }) => color || theme.colorV2.gray[1]} !important;
    border: 0;
    padding: 0;
    margin: 0;
    display: grid;
    align-items: center;

    ${({ $large, theme }) =>
      $large &&
      `
      font-size: ${theme.font.size[16]};
      line-height: 16px;
    `}

    ${({ $bold }) =>
      $bold &&
      `
        font-weight: 500;
    `}

    ${({ $larger }) => {
      return (
        $larger &&
        `
          height: 30px;
          font-size: 20px !important;
          line-height: 20px;
          font-weight: 400;
        `
      )
    }}
  `
}
