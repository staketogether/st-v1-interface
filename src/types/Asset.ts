import { Chain } from '@/config/chain'

export enum AssetCategory {
  Crypto = 'crypto',
  Stable = 'stable',
  Fan = 'fan',
  Meme = 'meme',
  Lego = 'lego'
}

export type AssetId =
  | 'eth-mainnet'
  | 'eth-op'
  | 'btc-op'
  | 'chz-chiliz'
  | 'op-op'
  | 'arb-arb'
  | 'matic-matic'
  | 'arb-eth'
  | 'stp-eth'
  | 'stp-reth'
export interface Asset {
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
  contractAddress: `0x${string}`
  points: {
    stPoints: boolean
    elPoints: boolean
  }
  mobula: {
    asset: string
    symbol: string
    blockchain: string
    filter: string
  }
  // Todo: Use ID on Backend instead of object
  ramp: {
    chainId: number
    minDeposit: number
    bridge?: {
      fromChainId: number
      fromToken: string
      toChainId: number
      toToken: string
    }
  }[]
}
