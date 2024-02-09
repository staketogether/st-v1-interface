import React from 'react'
import Image from 'next/image'
import { Tooltip } from 'antd'
import ethereumIcon from '@assets/network/ethereum.svg'
import optimismIcon from '@assets/network/optimist.svg'
import arbitrumIcon from '@assets/network/arbitrum.svg'
import polygonIcon from '@assets/network/polygon.svg'
import solanaIcon from '@assets/network/solana.svg'
import styled from 'styled-components'

type Network = 'ethereum' | 'optimism' | 'arbitrum' | 'polygon' | 'solana'

type NetworkIconProps = {
  network: Network
  size: number
  enabled: boolean
}

export default function NetworkIcons({ network, size, enabled = true }: NetworkIconProps) {
  const networkIcons = {
    ethereum: ethereumIcon,
    optimism: optimismIcon,
    arbitrum: arbitrumIcon,
    polygon: polygonIcon,
    solana: solanaIcon
  }

  return (
    <Tooltip title={network}>
      <NetworkIcon
        className={`${enabled ? '' : 'disabled'}`}
        src={networkIcons[network]}
        width={size}
        height={size}
        alt={network}
      />
    </Tooltip>
  )
}

const { NetworkIcon } = {
  NetworkIcon: styled(Image)`
    &.disabled {
      filter: grayscale(100%);
    }
  `
}
