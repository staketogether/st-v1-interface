import Image from 'next/image'
import styled from 'styled-components'
import useEns from '../../../hooks/useEns'
import SkeletonLoading from '../icons/SkeletonLoading'

type EnsAvatarProps = {
  address: `0x${string}`
  large?: boolean
  larger?: boolean
}

export default function EnsAvatar({ address, large, larger }: EnsAvatarProps) {
  const { avatar, avatarLoading } = useEns(address)

  if (avatarLoading) {
    return <SkeletonLoading borderRadius='50%' width={large ? 26 : 24} height={large ? 26 : 24} />
  }

  if (!avatar) {
    return <DefaultAvatar large={large} larger={larger} />
  }

  if (larger) {
    return <Avatar src={avatar} alt={address} width={32} height={32} />
  }

  if (large) {
    return <Avatar src={avatar} alt={address} width={26} height={26} />
  }

  return <Avatar src={avatar} alt={address} width={24} height={24} />
}

const { DefaultAvatar, Avatar } = {
  DefaultAvatar: styled.div<{ larger?: boolean; large?: boolean }>`
    background-color: ${({ theme }) => theme.color.blue[200]};
    border-radius: 100%;
    width: 24px;
    height: 24px;

    ${({ larger }) => larger && `width: 32px; height: 32px;`}
    ${({ large }) => large && `width: 26px; height: 26px;`}
  `,
  Avatar: styled(Image)`
    border-radius: 100%;
    box-shadow: ${({ theme }) => theme.shadow[100]};
  `
}
