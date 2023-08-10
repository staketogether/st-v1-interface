import React, { ReactNode } from 'react'
import { BsBook, BsHeart, BsLightbulb, BsPalette } from 'react-icons/bs'

type FilterPool = {
  icon: ReactNode
  value: string
}
type PoolsTypesIconProps = {
  iconSize: number
  value: string
}

export default function handlePoolTypeIcon({ iconSize, value }: PoolsTypesIconProps) {
  const filterTypes: FilterPool[] = [
    {
      icon: <BsPalette fontSize={iconSize} />,
      value: 'all'
    },
    {
      icon: <BsBook fontSize={iconSize} />,
      value: 'education'
    },
    {
      icon: <BsHeart fontSize={iconSize} />,
      value: 'socialImpact'
    },
    {
      icon: <BsLightbulb fontSize={iconSize} />,
      value: 'innovation'
    }
  ]

  const icon = filterTypes.find(item => item.value === value)

  return icon?.icon || <></>
}
