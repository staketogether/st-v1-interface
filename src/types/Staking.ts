import { StaticImageData } from 'next/image'
import { Asset, Erc20Asset, EvmAsset } from '@/types/Asset'

export type StakingId = 'eth-staking' | 'eth-restaking' | 'chz-staking'
export interface Staking {
  id: StakingId
  order: number
  symbol: string
  symbolImage: string
  logoImage: string | StaticImageData
  url: string
  listed: boolean
  enabled: boolean
  isTestnet: boolean
  new: boolean
  apy: number
  stakeTogetherPool: string
  localeDescription: string
  points: {
    stPoints: boolean
    elPoints: boolean
  }
  asset: EvmAsset
  contracts: {
    Airdrop: `0x${string}`
    Withdrawals: `0x${string}`
    Router: `0x${string}`
    StakeTogether: `0x${string}`
    StakeTogetherWrapper: `0x${string}`
  }
  subgraph: string
}
