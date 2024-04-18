import arbitrumIcon from '@assets/network/arbitrum.svg'
import bitcoinIcon from '@assets/network/bitcoin.png'
import celestiaIcon from '@assets/network/celestia.svg'
import chilizIcon from '@assets/network/chiliz.svg'
import cosmosIcon from '@assets/network/cosmos.svg'
import ethereumIcon from '@assets/network/ethereum.svg'
import NearIcon from '@assets/network/near.svg'
import optimismIcon from '@assets/network/optimist.svg'
import polkadotIcon from '@assets/network/polkadot.svg'
import polygonIcon from '@assets/network/polygon.svg'
import restaking from '@assets/network/restaking.svg'
import solanaIcon from '@assets/network/solana.svg'
import stIcon from '@assets/st-symbol.svg'
import stpRETHIcon from '@assets/stpRETHIcon.svg'
import Image from 'next/image'
import styled from 'styled-components'

interface SymbolIconsProps {
  assetIcon: string
  networkIcon?: string
  size: number
  marginRight?: string | number
}

export default function AssetIcon({ assetIcon, size, networkIcon, marginRight }: SymbolIconsProps) {
  const assetSymbolIcons = {
    stpETH: stIcon,
    strETH: stpRETHIcon,
    stpPOL: stIcon,
    stpSOL: stIcon,
    stpTIA: stIcon,
    stpNear: stIcon,
    stpDOT: stIcon,
    stpATOM: stIcon,
    stpBTC: stIcon,
    stpCHZ: stIcon,
    ethereum: ethereumIcon,
    optimism: optimismIcon,
    ['optimism-sepolia']: optimismIcon,
    arbitrum: arbitrumIcon,
    polygon: polygonIcon,
    solana: solanaIcon,
    holesky: ethereumIcon,
    wBTC: bitcoinIcon,
    ETH: ethereumIcon,
    'ethereum-stake': ethereumIcon,
    'ethereum-restaking': restaking,
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

  const networkIcons = {
    ethereum: ethereumIcon,
    optimism: optimismIcon,
    'optimism-sepolia': optimismIcon,
    arbitrum: arbitrumIcon,
    polygon: polygonIcon,
    solana: solanaIcon,
    holesky: ethereumIcon,
    chiliz: chilizIcon
  }

  return (
    <Wrapper style={{ marginRight: marginRight ? marginRight : 'inherit' }} size={size}>
      <Image src={assetSymbolIcons[assetIcon as keyof typeof assetSymbolIcons]} width={size} height={size} alt={assetIcon} />
      {networkIcon && (
        <div>
          <Image
            src={networkIcons[networkIcon as keyof typeof networkIcons]}
            width={size <= 24 ? 14 : 16}
            height={size <= 24 ? 14 : 16}
            alt={networkIcon}
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
