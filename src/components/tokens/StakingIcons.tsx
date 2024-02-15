import React from 'react'
import Image from 'next/image'
import polygonIcon from '@assets/network/polygon.svg'
import ethereumIcon from '@assets/network/ethereum.svg'
import polkadotIcon from '@assets/network/polkadot.svg'
import solanaIcon from '@assets/network/solana.svg'
import NearIcon from '@assets/network/near.svg'
import cosmosIcon from '@assets/network/cosmos.svg'
import celestiaIcon from '@assets/network/celestia.svg'
import restaking from '@assets/network/restaking.svg'
import { StakingProductIcon } from '@/types/Product'

type NetworkIconProps = {
  stakingProduct: StakingProductIcon
  size: number
}

export default function StakingIcons({ stakingProduct, size }: NetworkIconProps) {
  const stakingProductsIcons = {
    ethereum: ethereumIcon,
    EthereumRestaking: restaking,
    polygon: polygonIcon,
    solana: solanaIcon,
    celestia: celestiaIcon,
    cosmos: cosmosIcon,
    near: NearIcon,
    polkadot: polkadotIcon
  }

  return <Image src={stakingProductsIcons[stakingProduct]} width={size} height={size} alt={stakingProduct} />
}
