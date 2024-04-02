import Image from 'next/image'
import styled from 'styled-components'
import useEns from '../../../hooks/useEns'
import SkeletonLoading from '../icons/SkeletonLoading'

type EnsAvatarProps = {
  address: `0x${string}`
  size?: number
  chainId: number
}

export default function EnsAvatar({ address, size = 24, chainId }: EnsAvatarProps) {
  const { avatar, avatarLoading } = useEns(address, chainId)

  if (avatarLoading) {
    return <SkeletonLoading $borderRadius='50%' width={size} height={size} />
  }

  return avatar ? (
    <Avatar width={size} height={size} src={avatar} alt={address} size={size} />
  ) : (
    <DefaultAvatar size={size} />
  )
}

const { DefaultAvatar, Avatar } = {
  DefaultAvatar: styled.div<{ size: number }>`
    background-color: ${({ theme }) => theme.colorV2.gray[2]};
    border-radius: 100%;

    width: ${props => `${props.size}px`};
    height: ${props => `${props.size}px`};
    box-shadow: ${({ theme }) => theme.shadow[300]};
  `,
  Avatar: styled(Image)<{ size: number }>`
    border-radius: 100%;
    box-shadow: ${({ theme }) => theme.shadow[300]};

    width: ${props => `${props.size}px`};
    height: ${props => `${props.size}px`};
  `
}
