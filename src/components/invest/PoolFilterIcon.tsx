import { ReactNode } from 'react'
import { BsBook, BsBrush, BsHeart } from 'react-icons/bs'

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
      icon: <BsBrush fontSize={iconSize} />,
      value: 'art'
    },
    {
      icon: <BsBook fontSize={iconSize} />,
      value: 'education'
    },
    {
      icon: <BsHeart fontSize={iconSize} />,
      value: 'social'
    }
  ]

  const icon = filterTypes.find(item => item.value === value)

  return icon?.icon || <></>
}
