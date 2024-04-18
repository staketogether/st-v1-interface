import { ReactNode } from 'react'
import { PiBookOpenText, PiCodesandboxLogo, PiHandHeart } from 'react-icons/pi'

interface FilterPool {
  icon: ReactNode
  value: string
}

interface PoolFilterIconProps {
  iconSize: number
  value: string
}

export default function PoolFilterIcon({ iconSize, value }: PoolFilterIconProps) {
  const filterTypes: FilterPool[] = [
    {
      icon: <PiBookOpenText fontSize={iconSize} />,
      value: 'education'
    },
    {
      icon: <PiHandHeart fontSize={iconSize} />,
      value: 'social'
    },
    {
      icon: <PiCodesandboxLogo fontSize={iconSize} />,
      value: 'technology'
    }
  ]

  const icon = filterTypes.find(item => item.value === value)

  return icon?.icon ?? <></>
}
