import arbitrumIcon from '@assets/network/arbitrum.svg'
import chilizIcon from '@assets/network/chiliz.svg'
import bitcoinIcon from '@assets/assets/bitcoin.svg'
import ethereumIcon from '@assets/network/ethereum.svg'
import optimismIcon from '@assets/network/optimist.svg'
import polygonIcon from '@assets/network/polygon.svg'

import Image, { StaticImageData } from 'next/image'
import styled from 'styled-components'
import {
  arbitrum,
  chiliz,
  mainnet,
  optimism,
  polygon,
  zkSync
} from 'wagmi/chains'
import { Chain } from '@/config/chain'
import zkIcon from '@assets/network/zk.png'

interface NetworkIconProps {
  chain?: number
  size: number
  enabled?: boolean
}

export default function NetworkIcon({ chain, size, enabled = true }: NetworkIconProps) {
  if (!chain) {
    return null
  }

  const networkIcons: Record<number, string | StaticImageData> = {
    [Chain.BTC_MAINNET]: bitcoinIcon,
    [mainnet.id]: ethereumIcon,
    [optimism.id]: optimismIcon,
    [arbitrum.id]: arbitrumIcon,
    [polygon.id]: polygonIcon,
    [chiliz.id]: chilizIcon,
    [zkSync.id]: zkIcon
  }

  const networkIcon: string | StaticImageData = networkIcons[chain]

  return <Icon className={`${enabled ? '' : 'disabled'}`} width={size} height={size} src={networkIcon} alt='Network' />
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
