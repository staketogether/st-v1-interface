import { ReactNode } from 'react'
import { PiBookOpenText, PiCodesandboxLogo, PiHandHeart } from 'react-icons/pi'
import { SiDragonframe } from 'react-icons/si'

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
    },
    {
      icon: <SiDragonframe fontSize={iconSize} />,
      value: 'collectibles'
    }
  ]

  const icon = filterTypes.find(item => item.value === value)

  return icon?.icon || <></>
}
