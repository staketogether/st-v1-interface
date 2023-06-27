import { AiOutlineLoading } from 'react-icons/ai'
import styled, { keyframes } from 'styled-components'

type LoadingProps = {
  size?: number
  color?: string
  className?: string
}

export default function Loading({ size, className, color }: LoadingProps) {
  return <LoadingIcon size={size || undefined} color={color} className={className} />
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const { LoadingIcon } = {
  LoadingIcon: styled(AiOutlineLoading)`
    animation: ${rotate} 1s linear infinite;
  `
}
