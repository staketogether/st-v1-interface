import Image from 'next/image'
import styled from 'styled-components'
import useEns from '../../../hooks/useEns'
import SkeletonLoading from '../icons/SkeletonLoading'

type EnsAvatarProps = {
  address: `0x${string}`
  large?: boolean
}

export default function EnsAvatar({ address, large }: EnsAvatarProps) {
  const { avatar, avatarLoading } = useEns(address)

  if (avatarLoading) {
    return <SkeletonLoading borderRadius='50%' width={large ? 26 : 24} height={large ? 26 : 24} />
  }

  return avatar ? (
    <Avatar
      width={large ? 26 : 24}
      height={large ? 26 : 24}
      src={avatar}
      alt={address}
      className={large ? 'large' : ''}
    />
  ) : (
    <DefaultAvatar className={large ? 'large' : ''} />
  )
}

const { DefaultAvatar, Avatar } = {
  DefaultAvatar: styled.div`
    background-color: ${({ theme }) => theme.color.blue[200]};
    border-radius: 100%;
    width: 24px;
    height: 24px;

    &.large {
      width: 26px;
      height: 26px;
    }
  `,
  Avatar: styled(Image)`
    border-radius: 100%;
    box-shadow: ${({ theme }) => theme.shadow[100]};

    &.large {
      width: 26px;
      height: 26px;
    }
  `
}
