import { AiOutlineLoading } from 'react-icons/ai'
import styled, { keyframes } from 'styled-components'

export default function Loading() {
  return <LoadingIcon />
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
