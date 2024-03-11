import React from 'react'
import Image from 'next/image'
import { ProductSymbol } from '@/types/Product'
import stIcon from '@assets/st-symbol.svg'
import styled from 'styled-components'

type SymbolIconsProps = {
  productSymbol: ProductSymbol
  size: number
}

export default function SymbolIcons({ productSymbol, size }: SymbolIconsProps) {
  const productSymbolIcons = {
    stpETH: stIcon,
    stpRETH: stIcon,
    stpPOL: stIcon,
    stpSOL: stIcon,
    stpTIA: stIcon,
    stpNear: stIcon,
    stpKSM: stIcon,
    stpATOM: stIcon,
    stpBTC: stIcon,
    stpCHZ: stIcon
  }

  return (
    <Warper>
      <Image src={productSymbolIcons[productSymbol]} width={size} height={size} alt={productSymbol} />
    </Warper>
  )
}

const { Warper } = {
  Warper: styled.div`
    img {
      border-radius: 100%;
    }
  `
}
