import { ProductAssetName } from '@/types/ProductAsset'
import bitcoinIcon from '@assets/network/bitcoin.png'
import ethereumIcon from '@assets/network/ethereum.svg'
import Image from 'next/image'
import styled from 'styled-components'

type TokenStakingIconsProps = {
  stakingProduct: ProductAssetName
  size: number
}

export default function TokensAssetIcon({ stakingProduct, size }: TokenStakingIconsProps) {
  const stakingProductsIcons = {
    eth: ethereumIcon,
    btc: bitcoinIcon,
    'eth-optimism': ethereumIcon
  }

  return (
    <Warper>
      <Image src={stakingProductsIcons[stakingProduct]} width={size} height={size} alt={stakingProduct} />
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
