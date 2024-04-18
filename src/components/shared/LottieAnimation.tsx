import dynamic from 'next/dynamic'
import { ReactNode } from 'react'
const Player = dynamic(() => import('@lottiefiles/react-lottie-player').then(mod => mod.Player), { ssr: false })

interface LottieAnimationProps {
  animationData: object
  loop?: boolean | number
  autoplay?: boolean
  children?: ReactNode
  width?: number
  height?: number
}

export default function LottieAnimation({ animationData, loop = false, autoplay = true, width, height }: LottieAnimationProps) {
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
