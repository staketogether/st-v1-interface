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
import eigenLayer from '@assets/airdrop/eigenLayer.svg'
import layerZero from '@assets/airdrop/layerZero.svg'
import stIcon from '@assets/st-symbol.svg'
import styled from 'styled-components'
import { Airdrop } from '@/types/Product'

type NetworkIconProps = {
  airdrop: Airdrop
  size: number
}

export default function AirdropIcons({ airdrop, size }: NetworkIconProps) {
  const airdropProducts = {
    ethereum: ethereumIcon,
    EthereumRestaking: restaking,
    polygon: polygonIcon,
    solana: solanaIcon,
    celestia: celestiaIcon,
    cosmos: cosmosIcon,
    near: NearIcon,
    polkadot: polkadotIcon,
    eigenLayer: eigenLayer,
    layerZero: layerZero,
    stakeTogether: stIcon
  }

  return <NextIcon src={airdropProducts[airdrop]} width={size} height={size} alt={airdrop} />
}
const { NextIcon } = {
  NextIcon: styled(Image)`
    border-radius: 100%;
  `
}
