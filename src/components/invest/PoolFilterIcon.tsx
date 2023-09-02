import { ReactNode } from 'react'
import { PiBookOpenText, PiCodesandboxLogo, PiHandHeart, PiPaintBrush } from 'react-icons/pi'

type FilterPool = {
  icon: ReactNode
  value: string
}

type PoolFilterIconProps = {
  iconSize: number
  value: string
}

export default function PoolFilterIcon({ iconSize, value }: PoolFilterIconProps) {
  const filterTypes: FilterPool[] = [
    {
      icon: <PiPaintBrush fontSize={iconSize} />,
      value: 'art'
    },
    {
      icon: <PiBookOpenText fontSize={iconSize} />,
      value: 'education'
    },
    {
      icon: <PiHandHeart fontSize={iconSize} />,
      value: 'socialImpact'
    },
    {
      icon: <PiCodesandboxLogo fontSize={iconSize} />,
      value: 'technology'
    }
  ]

  const icon = filterTypes.find(item => item.value === value)

  return icon?.icon || <></>
}
