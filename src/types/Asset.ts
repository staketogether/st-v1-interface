import { Chain } from '@/config/chain'
import { StaticImageData } from 'next/image'

export enum AssetCategory {
  Stable = 'stable',
  FanToken = 'fan-token',
  Defi = 'defi',
  Infrastructure = 'infrastructure'
}

export interface TokenActions {
  disableActions?: {
    buy?: boolean
    sell?: boolean
    swap?: boolean
    send?: boolean
    receive?: boolean
  }
}

export interface Ramp {
  chainId: number
  minDeposit: number
  provider: 'brla' | 'transak'
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
  | 'btc-btc'
  | 'dog-btc'
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
  | 'zk-zksync'
  | 'wbtc-zksync'
  | 'eth-zksync'
  | 'dog-btc'


export interface NativeAsset extends TokenActions {
  id: AssetId
  decimals: number
  name: string
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

export interface BitcoinAsset extends TokenActions {
  type: 'bitcoin'
  id: AssetId
  assetId: string
  name: string
  order: number
  symbol: string
  symbolImage: string | StaticImageData
  url: string
  decimals: number
  category: AssetCategory
  chains: Chain[]
  listed: boolean
  enabled: boolean
  isTestnet: boolean
  new: boolean
  localeDescription: string
  linkedAssets?: Record<Chain, Asset>
  points: {
    stPoints: boolean
    elPoints: boolean
  }
  // Todo: Use ID on Backend instead of object
  ramp: Ramp[]
}

export interface Erc20Asset extends TokenActions {
  id: AssetId
  name: string
  order: number
  symbol: string
  symbolImage: string | StaticImageData
  url: string
  decimals: number
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

export interface FanTokenAsset extends TokenActions {
  id: AssetId
  name: string
  order: number
  symbol: string
  decimals: number
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

export type Asset = NativeAsset | Erc20Asset | FanTokenAsset | BitcoinAsset
