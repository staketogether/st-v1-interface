import { PoolsType } from '@/types/Pool'
import React, { ReactNode } from 'react'
import { BsBook, BsHeart, BsLightbulb, BsPalette } from 'react-icons/bs'

type FilterPool = {
  icon: ReactNode
  value: PoolsType
}
type PoolsTypesIconProps = {
  iconSize: number
  value: PoolsType
}

export default function handlePoolTypeIcon({ iconSize, value }: PoolsTypesIconProps) {
  const filterTypes: FilterPool[] = [
    {
      icon: <BsPalette fontSize={iconSize} />,
      value: PoolsType.art
    },
    {
      icon: <BsBook fontSize={iconSize} />,
      value: PoolsType.education
    },
    {
      icon: <BsHeart fontSize={iconSize} />,
      value: PoolsType.socialImpact
    },
    {
      icon: <BsLightbulb fontSize={iconSize} />,
      value: PoolsType.innovation
    }
  ]

  const icon = filterTypes.find(item => item.value === value)

  return icon?.icon || <></>
}
