import React from 'react'
import Image from 'next/image'
import { Network, ProductSymbol } from '@/types/Product'
import stIcon from '@assets/st-symbol.svg'
import stpRETHIcon from '@assets/stpRETHIcon.svg'
import styled from 'styled-components'
import ethereumIcon from '@assets/network/ethereum.svg'
import optimismIcon from '@assets/network/optimist.svg'
import arbitrumIcon from '@assets/network/arbitrum.svg'
import polygonIcon from '@assets/network/polygon.svg'
import solanaIcon from '@assets/network/solana.svg'

type Icon = ProductSymbol | Network

type SymbolIconsProps = {
  assetIcon: Icon
  networkIcon: Network
  size: number
}

export default function AssetIcon({ assetIcon, size, networkIcon }: SymbolIconsProps) {
  const assetSymbolIcons = {
    stpETH: stIcon,
    strETH: stpRETHIcon,
    stpPOL: stIcon,
    stpSOL: stIcon,
    stpTIA: stIcon,
    stpNear: stIcon,
    stpKSM: stIcon,
    stpATOM: stIcon,
    stpBTC: stIcon,
    stpCHZ: stIcon,
    ethereum: ethereumIcon,
    optimism: optimismIcon,
    ['optimism-sepolia']: optimismIcon,
    arbitrum: arbitrumIcon,
    polygon: polygonIcon,
    solana: solanaIcon,
    holesky: ethereumIcon
  }

  const networkIcons = {
    ethereum: ethereumIcon,
    optimism: optimismIcon,
    ['optimism-sepolia']: optimismIcon,
    arbitrum: arbitrumIcon,
    polygon: polygonIcon,
    solana: solanaIcon,
    holesky: ethereumIcon
  }

  return (
    <Warper size={size}>
      <Image src={assetSymbolIcons[assetIcon]} width={size} height={size} alt={assetIcon} />
      <div>
        <Image
          src={networkIcons[networkIcon]}
          width={size <= 24 ? 12 : 16}
          height={size <= 24 ? 12 : 16}
          alt={networkIcon}
        />
      </div>
    </Warper>
  )
}

const { Warper } = {
  Warper: styled.div<{ size: number }>`
    position: relative;
    cursor: pointer;
    width: ${({ size }) => `${size}px`};
    height: ${({ size }) => `${size}px`};

    img {
      border-radius: 100%;
    }

    > div {
      display: flex;
      padding: 2px;
      align-items: center;

      border-radius: 99px;

      position: absolute;
      bottom: -4px;
      right: -6px;
    }
  `
}
