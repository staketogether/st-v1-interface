import Image from 'next/image'
import { styled } from 'styled-components'
import SkeletonLoading from '../icons/SkeletonLoading'

type EnsAvatarProps = {
  src: string
  alt: string
  size?: number
  loading?: boolean
}

export default function CommunityLogo({ src, alt, loading, size = 24 }: EnsAvatarProps) {
  if (loading) {
    return <SkeletonLoading borderRadius='50%' width={size} height={size} />
  }

  return src ? (
    <Avatar width={size} height={size} src={src} alt={alt} size={size} />
  ) : (
    <DefaultAvatar size={size} />
  )
}

const { DefaultAvatar, Avatar } = {
  DefaultAvatar: styled.div<{ size: number }>`
    background-color: ${({ theme }) => theme.color.blue[600]};
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
