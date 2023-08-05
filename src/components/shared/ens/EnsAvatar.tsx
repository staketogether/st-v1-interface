import Image from 'next/image'
import styled from 'styled-components'
import useEns from '../../../hooks/useEns'
import SkeletonLoading from '../icons/SkeletonLoading'

type EnsAvatarProps = {
  address: `0x${string}`
  size?: number
}

export default function EnsAvatar({ address, size = 24 }: EnsAvatarProps) {
  const { avatar, avatarLoading } = useEns(address)

  if (avatarLoading) {
    return <SkeletonLoading borderRadius='50%' width={size} height={size} />
  }

  return avatar ? (
    <Avatar width={size} height={size} src={avatar} alt={address} size={size} />
  ) : (
    <DefaultAvatar size={size} />
  )
}

const { DefaultAvatar, Avatar } = {
  DefaultAvatar: styled.div<{ size: number }>`
    background-color: ${({ theme }) => theme.color.blue[400]};
    border-radius: 100%;

    width: ${props => `${props.size}px`};
    height: ${props => `${props.size}px`};
  `,
  Avatar: styled(Image)<{ size: number }>`
    border-radius: 100%;
    box-shadow: ${({ theme }) => theme.shadow[100]};

    width: ${props => `${props.size}px`};
    height: ${props => `${props.size}px`};
  `
}
