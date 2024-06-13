import arbitrumIcon from '@assets/network/arbitrum.svg'
import chilizIcon from '@assets/network/chiliz.svg'
import ethereumIcon from '@assets/network/ethereum.svg'
import optimismIcon from '@assets/network/optimist.svg'
import polygonIcon from '@assets/network/polygon.svg'
import btcIcon from '@assets/assets/bitcoin.svg'

import Image from 'next/image'
import styled from 'styled-components'
import { arbitrum, arbitrumSepolia, chiliz, mainnet, optimism, optimismSepolia, polygon, polygonMumbai, sepolia, spicy } from 'wagmi/chains'

interface NetworkIconProps {
  chain?: number
  size: number
  enabled?: boolean
}

export default function NetworkIcon({ chain, size, enabled = true }: NetworkIconProps) {
  if (!chain) {
    return null
  }

  const networkIcons = {
    [mainnet.id]: ethereumIcon,
    [optimism.id]: optimismIcon,
    [arbitrum.id]: arbitrumIcon,
    [polygon.id]: polygonIcon,
    [chiliz.id]: chilizIcon,
    [sepolia.id]: ethereumIcon,
    [optimismSepolia.id]: optimismIcon,
    [arbitrumSepolia.id]: arbitrumIcon,
    [polygonMumbai.id]: polygonIcon,
    [spicy.id]: chilizIcon,
    [0]: btcIcon
  }

  return (
    <Icon
      className={`${enabled ? '' : 'disabled'}`}
      width={size}
      height={size}
      src={networkIcons[chain as keyof typeof networkIcons]}
      alt='Network'
    />
  )
}

const { Icon } = {
  Icon: styled(Image)`
    border-radius: 100%;
    box-shadow: ${({ theme }) => theme.shadow[100]};
    &.disabled {
      filter: grayscale(100%);
    }
  `
}
