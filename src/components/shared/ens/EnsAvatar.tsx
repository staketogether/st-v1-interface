import Image from 'next/image'
import { PiUser } from 'react-icons/pi'
import styled from 'styled-components'
import SkeletonLoading from '../icons/SkeletonLoading'

interface EnsAvatarProps {
  address: `0x${string}`
  size?: number
  avatar?: string
  avatarLoading: boolean
}

export default function EnsAvatar({ address, size = 24, avatarLoading, avatar }: EnsAvatarProps) {
  if (avatarLoading) {
    return <SkeletonLoading $borderRadius='50%' width={size} height={size} />
  }

  return avatar ? (
    <Avatar width={size} height={size} src={avatar} alt={address} size={size} />
  ) : (
    <DefaultAvatar size={size}>
      <PiUser />
    </DefaultAvatar>
  )
}

const { DefaultAvatar, Avatar } = {
  DefaultAvatar: styled.div<{ size: number }>`
    background-color: ${({ theme }) => theme.color.foreground};
    border-radius: 100%;

    width: ${props => `${props.size}px`};
    height: ${props => `${props.size}px`};
    box-shadow: ${({ theme }) => theme.shadow[300]};

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      color: ${({ theme }) => theme.colorV2.blue[1]};
    }
  `,
  Avatar: styled(Image)<{ size: number }>`
    border-radius: 100%;
    box-shadow: ${({ theme }) => theme.shadow[300]};

    width: ${props => `${props.size}px`};
    height: ${props => `${props.size}px`};
  `
}
