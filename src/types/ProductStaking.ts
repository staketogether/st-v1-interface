import { ProductAsset } from './ProductAsset'

export interface ProductStakingContracts {
  Airdrop: `0x${string}`
  Withdrawals: `0x${string}`
  Router: `0x${string}`
  StakeTogether: `0x${string}`
  StakeTogetherWrapper: `0x${string}`
}

export interface TradingViewFiatData {
  usd: string
  brl: string
  eur: string
}

export interface ProductStaking {
  id: number
  name: string
  description: string
  enabled: boolean
  newProductTag: boolean
  eigenPointsAvailable: boolean
  asset: ProductAsset
  tradingView: {
    symbol: string
    fiat: TradingViewFiatData
  }
  rampEnabled: boolean
  title: string
  symbol: string
  apy: number
  scan: string

  urlRedirect: string
  networkAvailable: string
  chainIdNetworkAvailable: number
  subgraph: {
    testnet: string
    mainnet: string
  }
  stakeTogetherPool: {
    testnet: `0x${string}`
    mainnet: `0x${string}`
  }
  contracts: {
    testnet: ProductStakingContracts
    mainnet: ProductStakingContracts
  }
  eventsTrack: {
    pageView: string
    checkout: string
    confirmation: string
    success: string
    withdraw: string
  }
  transactionConfig: {
    blockTimePerSeconds: number
    confirmations: number
  }
}

export interface ProductMarketAssetData {
  data: {
    ath: number
    atl: number
    name: string
    is_listed: boolean
    liquidity: number
    liquidity_change_24h: number
    market_cap: number
    market_cap_diluted: number
    off_chain_volume: number
    price: number
    price_change_1h: number
    price_change_1m: number
    price_change_1y: number
    price_change_24h: number
    price_change_7d: number
    volume: number
    volume_7d: number
    volume_change_24h: number
  }
}
