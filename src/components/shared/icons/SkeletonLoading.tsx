import { keyframes, styled } from 'styled-components'

type SkeletonLoadingProps = {
  className?: string
  height?: number
  width?: number
  borderRadius?: string
}

export default function SkeletonLoading({ className, height, width, borderRadius }: SkeletonLoadingProps) {
  return <Container className={className} height={height} width={width} borderRadius={borderRadius} />
}

const loading = keyframes`
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
`

const { Container } = {
  Container: styled.div<{ height?: number; width?: number; borderRadius?: string }>`
    height: ${props => (props.height ? `${props.height}px` : '14px')};
    width: ${props => (props.width ? `${props.width}px` : '100%')};
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.16) 25%,
      rgba(255, 255, 255, 0.4) 50%,
      rgba(255, 255, 255, 0.16) 75%
    );
    background-size: 200%;
    animation: ${loading} 1.5s infinite ease-in-out;

    border-radius: ${props => (props.borderRadius ? `${props.borderRadius}` : '12px')};
  `
}
