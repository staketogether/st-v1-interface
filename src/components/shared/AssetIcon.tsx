import { Chain } from '@/config/chain'
import arbitrumIcon from '@assets/network/arbitrum.svg'
import chilizIcon from '@assets/network/chiliz.svg'
import ethereumIcon from '@assets/network/ethereum.svg'
import optimismIcon from '@assets/network/optimist.svg'
import polygonIcon from '@assets/network/polygon.svg'
import zkIcon from '@assets/network/zk.png'
import defaultIcon from '@assets/assets/default-erc-20.svg'
import bitcoinIcon from '@assets/assets/bitcoin.svg'
import Image, { StaticImageData } from 'next/image'
import styled from 'styled-components'

interface SymbolIconsProps {
  altName?: string
  image?: string | StaticImageData
  chain?: number
  size: number
  marginRight?: string | number
}

export default function AssetIcon({ altName, image, size, chain, marginRight }: SymbolIconsProps) {
  const chainsIcon = {
    [Chain.BTC_MAINNET]: bitcoinIcon,
    [Chain.ETH_MAINNET]: ethereumIcon,
    [Chain.OP_MAINNET]: optimismIcon,
    [Chain.ARB_MAINNET]: arbitrumIcon,
    [Chain.POL_MAINNET]: polygonIcon,
    [Chain.CHZ_MAINNET]: chilizIcon,
    [Chain.ETH_TESTNET]: ethereumIcon,
    [Chain.OP_TESTNET]: optimismIcon,
    [Chain.ARB_TESTNET]: arbitrumIcon,
    [Chain.POL_TESTNET]: polygonIcon,
    [Chain.CHZ_TESTNET]: chilizIcon,
    [Chain.ZKSYNC_MAINNET]: zkIcon
  }

  return (
    <Wrapper style={{ marginRight: marginRight ? marginRight : 'inherit' }} size={size}>
      <Image src={image ?? defaultIcon} width={size} height={size} alt={`${altName}`} />
      {chain !== undefined && (
        <div>
          <Image
            src={chainsIcon[chain]}
            width={size <= 24 ? 14 : 16}
            height={size <= 24 ? 14 : 16}
            alt={'Network'}
            className='white-border'
          />
        </div>
      )}
    </Wrapper>
  )
}

const { Wrapper } = {
  Wrapper: styled.div<{ size: number }>`
    position: relative;
    cursor: pointer;
    width: ${({ size }) => `${size}px`};
    height: ${({ size }) => `${size}px`};

    img {
      border-radius: 100%;
      box-shadow: ${({ theme }) => theme.shadow[100]};
      &.white-border {
        border: 1px solid ${({ theme }) => theme.colorV2.white};
        padding: 0px;
      }
    }

    > div {
      display: flex;
      align-items: center;
      border-radius: 100%;
      position: absolute;
      bottom: -4px;
      right: -6px;
    }
  `
}
