import { Chain } from '@/config/chain'
import { StaticImageData } from 'next/image'

export enum AssetCategory {
  Staking = 'staking',
  Crypto = 'crypto',
  Stable = 'stable',
  Fan = 'fan',
  Meme = 'meme',
  Lego = 'lego'
}

export interface Asset {
  id: string
  order: number
  symbol: string
  symbolImage: string | StaticImageData
  logoImage: string | StaticImageData
  url: string
  category: AssetCategory
  chains: Chain[]
  listed: boolean
  enabled: boolean
  isTestnet: boolean
  new: boolean
  linkedAssets?: Record<Chain, Asset>
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
  ramp?: {
    chainId: number
    minDeposit: number
    bridge?: {
      fromChainId: number
      fromToken: string
      toChainId: number
      toToken: string
    }
  }[]
  staking?: {
    apy: number
    stakeTogetherPool: {
      mainnet: string
      testnet: string
    }
    contracts: {
      mainnet: {
        Airdrop: `0x${string}`
        Withdrawals: `0x${string}`
        Router: `0x${string}`
        StakeTogether: `0x${string}`
        StakeTogetherWrapper: `0x${string}`
      }
      testnet: {
        Airdrop: `0x${string}`
        Withdrawals: `0x${string}`
        Router: `0x${string}`
        StakeTogether: `0x${string}`
        StakeTogetherWrapper: `0x${string}`
      }
    }
    subgraph: string
  }
}
