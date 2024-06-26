import arbitrumIcon from '@assets/network/arbitrum.svg'
import chilizIcon from '@assets/network/chiliz.svg'
import ethereumIcon from '@assets/network/ethereum.svg'
import optimismIcon from '@assets/network/optimist.svg'
import polygonIcon from '@assets/network/polygon.svg'
import solanaIcon from '@assets/network/solana.svg'
import zkSyncIcon from '@assets/network/zk.png'
import bitcoinIcon from '@assets/assets/bitcoin.svg'
import { Tooltip } from 'antd'
import Image from 'next/image'
import styled from 'styled-components'

interface NetworkIconProps {
  network: string
  size: number
  enabled?: boolean
  showTooltip?: boolean
}

export default function NetworkIcons({ network, size, enabled = true, showTooltip = true }: NetworkIconProps) {
  const networkIcons = {
    ethereum: ethereumIcon,
    optimism: optimismIcon,
    optimistic: optimismIcon,
    ['optimism-sepolia']: optimismIcon,
    chiliz: chilizIcon,
    spicy: chilizIcon,
    arbitrum: arbitrumIcon,
    polygon: polygonIcon,
    solana: solanaIcon,
    holesky: ethereumIcon,
    zksync: zkSyncIcon,
    bitcoin: bitcoinIcon
  }

  if (!showTooltip) {
    return (
      <NetworkIcon
        className={`${enabled ? '' : 'disabled'}`}
        src={networkIcons[network as keyof typeof networkIcons]}
        width={size}
        height={size}
        alt={network}
      />
    )
  }
  return (
    <Tooltip title={network}>
      <NetworkIcon
        className={`${enabled ? '' : 'disabled'}`}
        src={networkIcons[network as keyof typeof networkIcons]}
        width={size}
        height={size}
        alt={network}
      />
    </Tooltip>
  )
}

const { NetworkIcon } = {
  NetworkIcon: styled(Image)`
    border-radius: 100%;
    box-shadow: ${({ theme }) => theme.shadow[100]};
    &.disabled {
      filter: grayscale(100%);
    }
  `
}
