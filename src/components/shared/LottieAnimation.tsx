import React, { ReactNode } from 'react'
import { Player } from '@lottiefiles/react-lottie-player'

interface LottieAnimationProps {
  animationData: object
  loop?: boolean | number
  autoplay?: boolean
  children?: ReactNode
  width?: number
  height?: number
}

export default function LottieAnimation({
  animationData,
  loop = false,
  autoplay = true,
  width,
  height
}: LottieAnimationProps) {
  return (
    <Player
      autoplay={autoplay}
      loop={loop}
      controls={true}
      src={animationData}
      style={{ height: `${height ? `${height}px` : 'auto%'}`, maxWidth: `${width ? `${width}px` : '100%'}` }}
      keepLastFrame={true}
    />
  )
}
