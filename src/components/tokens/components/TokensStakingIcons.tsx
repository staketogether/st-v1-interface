import bitcoinIcon from '@assets/network/bitcoin.png'
import celestiaIcon from '@assets/network/celestia.svg'
import chilizIcon from '@assets/network/chiliz.svg'
import cosmosIcon from '@assets/network/cosmos.svg'
import ethereumIcon from '@assets/network/ethereum.svg'
import NearIcon from '@assets/network/near.svg'
import polkadotIcon from '@assets/network/polkadot.svg'
import polygonIcon from '@assets/network/polygon.svg'
import restaking from '@assets/network/restaking.svg'
import solanaIcon from '@assets/network/solana.svg'
import Image from 'next/image'
import styled from 'styled-components'

type TokenStakingIconsProps = {
  stakingProduct: string
  size: number
}

export default function TokenStakingIcons({ stakingProduct, size }: TokenStakingIconsProps) {
  const stakingProductsIcons = {
    'ethereum-stake': ethereumIcon,
    'ethereum-restaking': restaking,
    polygon: polygonIcon,
    solana: solanaIcon,
    celestia: celestiaIcon,
    cosmos: cosmosIcon,
    near: NearIcon,
    polkadot: polkadotIcon,
    chiliz: chilizIcon,
    bitcoin: bitcoinIcon,
    btc: bitcoinIcon,
    eth: ethereumIcon,
    'eth-optimism': ethereumIcon
  }

  return (
    <Warper>
      <Image
        src={stakingProductsIcons[stakingProduct as keyof typeof stakingProductsIcons]}
        width={size}
        height={size}
        alt={stakingProduct}
      />
    </Warper>
  )
}

const { Warper } = {
  Warper: styled.div`
    img {
      border-radius: 100%;
      box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.2);
    }
  `
}
