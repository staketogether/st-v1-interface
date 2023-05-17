import Image from 'next/image'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import useEns from '../../../hooks/useEns'

type EnsAvatarProps = {
  address: `0x${string}`
}

export default function EnsAvatar({ address }: EnsAvatarProps) {
  const { avatar } = useEns(address)

  const [avatarEl, setAvatarEl] = useState(<DefaultAvatar />)

  useEffect(() => {
    if (avatar) {
      setAvatarEl(<Avatar width={24} height={24} src={avatar} alt={address} />)
    } else {
      setAvatarEl(<DefaultAvatar />)
    }
  }, [address, avatar])

  return avatarEl
}

const { DefaultAvatar, Avatar } = {
  DefaultAvatar: styled.div`
    background-color: ${({ theme }) => theme.color.purple[200]};
    border-radius: 100%;
    width: 24px;
    height: 24px;
  `,
  Avatar: styled(Image)`
    border-radius: 100%;
  `
}
