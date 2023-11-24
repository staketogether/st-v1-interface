import styled from 'styled-components'
import SkeletonLoading from '../icons/SkeletonLoading'
import { PiEyeSlash } from 'react-icons/pi'

type CommunityLogoProps = {
  src?: string
  alt: string
  size?: number
  loading?: boolean
  listed?: boolean
}

export default function CommunityLogo({ src, alt, loading, size = 24, listed = true }: CommunityLogoProps) {
  if (loading) {
    return <SkeletonLoading $borderRadius='50%' width={size} height={size} />
  }

  return src ? (
    <Avatar width={size} height={size} src={src} alt={alt} size={size} />
  ) : (
    <>
      {listed ? (
        <DefaultAvatar size={size} />
      ) : (
        <>
          <DefaultAvatar size={size}>
            <NotListed />
          </DefaultAvatar>
        </>
      )}
    </>
  )
}

const { DefaultAvatar, Avatar, NotListed } = {
  DefaultAvatar: styled.div<{ size: number }>`
    background-color: ${({ theme }) => theme.color.blue[600]};
    border-radius: 100%;

    width: ${props => `${props.size}px`};
    height: ${props => `${props.size}px`};

    display: flex;
    align-items: center;
    justify-content: center !important;
  `,
  NotListed: styled(PiEyeSlash)`
    color: white;
    font-size: 14px;
  `,
  Avatar: styled.img<{ size: number }>`
    border-radius: 100%;
    box-shadow: ${({ theme }) => theme.shadow[300]};

    width: ${props => `${props.size}px`};
    height: ${props => `${props.size}px`};
  `
}
