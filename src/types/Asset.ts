import { Chain } from '@/config/chain'
import { StaticImageData } from 'next/image'

export enum AssetCategory {
  Crypto = 'crypto',
  Stable = 'stable',
  Fan = 'fan',
  Meme = 'meme',
  Lego = 'lego'
}

export type AssetsId = 'eth-eth' | 'eth-op' | 'btc-op'
export interface Asset {
  id: AssetsId
  order: number
  symbol: string
  symbolImage: string | StaticImageData
  url: string
  category: AssetCategory
  chains: Chain[]
  listed: boolean
  enabled: boolean
  isTestnet: boolean
  new: boolean
  linkedAssets?: Record<Chain, Asset>
  contractAddress?: `0x${string}`
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
  tradingView: {
    symbol: string
    fiat: {
      usd: string
      brl: string
      eur: string
    }
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
