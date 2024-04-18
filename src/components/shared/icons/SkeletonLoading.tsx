import styled, { keyframes } from 'styled-components'

interface SkeletonLoadingProps {
  className?: string
  height?: number
  width?: number
  $borderRadius?: string
}

export default function SkeletonLoading({ className, height, width, $borderRadius }: SkeletonLoadingProps) {
  return <Container className={className} height={height} width={width} $borderRadius={$borderRadius} />
}

const loading = keyframes`
  0% {
    background-position: 200% 50%;
  }
  100% {
    background-position: -200% 50%;
  }
`

const { Container } = {
  Container: styled.div<{ height?: number; width?: number; $borderRadius?: string }>`
    height: ${props => (props.height ? `${props.height}px` : '14px')};
    width: ${props => (props.width ? `${props.width}px` : '100%')};

    background: linear-gradient(90deg, rgba(172, 172, 172, 0.2) 25%, rgba(172, 172, 172, 0.4) 50%, rgba(172, 172, 172, 0.2) 75%);
    background-size: 400%;
    animation: ${loading} 2s infinite linear;

    border-radius: ${props => (props.$borderRadius ? `${props.$borderRadius}` : '12px')};
  `
}
