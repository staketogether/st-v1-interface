import { styled } from 'styled-components'

import { truncateAddress, truncateText } from '../../../services/truncate'
import SkeletonLoading from '../icons/SkeletonLoading'

type EnsNameProps = {
  name: string
  loading?: string
  large?: boolean
  larger?: boolean
  slice?: number
  color?: string
}

export default function CommunityName({ name, loading, large, larger, slice, color }: EnsNameProps) {
  if (loading && !larger && !large) {
    return <SkeletonLoading width={140} height={14} />
  } else if (loading && large) {
    return <SkeletonLoading width={140} height={15} />
  } else if (loading && larger) {
    return <SkeletonLoading width={140} height={22} />
  } else if (name) {
    return (
      <Text color={color} large={large} larger={larger}>
        {slice ? truncateText(name, slice) : name}
      </Text>
    )
  } else {
    return (
      <Text color={color} large={large} larger={larger}>
        {truncateAddress(name)}
      </Text>
    )
  }
}

const { Text } = {
  Text: styled.span<{ large?: boolean; larger?: boolean; color?: string }>`
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme, color }) => color || theme.colorV2.gray[1]};
    border: 0;
    padding: 0;
    margin: 0;
    display: grid;
    align-items: center;

    ${({ large, theme }) =>
      large &&
      `
      font-size: ${theme.font.size[16]};
    `}

    ${({ larger, theme }) => {
      return (
        larger &&
        `
          height: 30px;
          font-size: ${theme.font.size[22]} !important;
        `
      )
    }}
  `
}
