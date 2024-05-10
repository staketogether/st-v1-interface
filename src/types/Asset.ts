import { Chain } from '@/config/chain'
import { StaticImageData } from 'next/image'

export enum AssetCategory {
  Stable = 'stable',
  FanToken = 'fan-token',
  Defi = 'defi',
  Infrastructure = 'infrastructure'
}

export interface Ramp {
  chainId: number
  minDeposit: number
  provider: 'brla'
  paymentMethod: 'pix'
  bridge?: {
    fromChainId: number
    fromToken: string
    toChainId: number
    toToken: string
  }
}

export type AssetId =
  | 'eth-mainnet'
  | 'eth-op'
  | 'btc-op'
  | 'chz-chiliz'
  | 'op-op'
  | 'arb-arb'
  | 'matic-matic'
  | 'eth-arb'
  | 'stp-eth'
  | 'str-eth'
  | 'mengo-chz'
  | 'galo-chz'
  | 'flu-chz'
  | 'vasco-chz'
  | 'verdao-chz'
  | 'saci-chz'
  | 'spfc-chz'
  | 'bahia-chz'
  | 'pendle-arb'
  | 'chainlink-op'
  | 'render-arb'
  | 'thegraph-arb'
  | 'worldcoin-op'
  | 'aave-op'
  | 'uniswap-op'
  | 'ssv-eth'
  | 'usdc-op'
  | 'usdt-op'
  | 'brla-matic'
  | 'eurt-op'
  | 'goldt-op'
  | 'solana-eth'
  | 'thorchain-eth'

export interface NativeAsset {
  id: AssetId
  order: number
  symbol: string
  symbolImage: string
  url: string
  category: AssetCategory
  chains: Chain[]
  listed: boolean
  enabled: boolean
  isTestnet: boolean
  new: boolean
  localeDescription: string
  linkedAssets?: Record<Chain, Asset>
  type: 'native'
  contractAddress: '0x0000000000000000000000000000000000000000'
  wrapperContractAddress?: `0x${string}`
  points: {
    stPoints: boolean
    elPoints: boolean
  }
  // Todo: Use ID on Backend instead of object
  ramp: Ramp[]
}

export interface Erc20Asset {
  id: AssetId
  order: number
  symbol: string
  symbolImage: string | StaticImageData
  url: string
  category: AssetCategory
  chains: Chain[]
  listed: boolean
  enabled: boolean
  isTestnet: boolean
  type: 'erc20'
  new: boolean
  localeDescription: string
  linkedAssets?: Record<Chain, Asset>
  contractAddress: `0x${string}`
  points: {
    stPoints: boolean
    elPoints: boolean
  }
  // Todo: Use ID on Backend instead of object
  ramp: Ramp[]
}

export interface FanTokenAsset {
  id: AssetId
  order: number
  symbol: string
  symbolImage: string | StaticImageData
  url: string
  category: AssetCategory
  chains: Chain[]
  listed: boolean
  enabled: boolean
  isTestnet: boolean
  type: 'fan-token'
  new: boolean
  localeDescription: string
  linkedAssets?: Record<Chain, Asset>
  contractAddress: `0x${string}`
  points: {
    stPoints: boolean
    elPoints: boolean
  }
  // Todo: Use ID on Backend instead of object
  ramp: Ramp[]
}

export type Asset = NativeAsset | Erc20Asset | FanTokenAsset
