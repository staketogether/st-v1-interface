import { ProductAssetName } from './ProductAsset'

export type ProductStakingIcon =
  | 'ethereum'
  | 'EthereumRestaking'
  | 'polygon'
  | 'solana'
  | 'celestia'
  | 'cosmos'
  | 'near'
  | 'polkadot'
  | 'bitcoin'
  | 'chiliz'

export type ProductStakingName =
  | 'ethereum-stake'
  | 'ethereum-restaking'
  | 'polygon'
  | 'solana'
  | 'celestia'
  | 'cosmos'
  | 'near'
  | 'polkadot'
  | 'bitcoin'
  | 'chiliz'

export type ProductStakingSymbol =
  | 'stpETH'
  | 'strETH'
  | 'stpPOL'
  | 'stpSOL'
  | 'stpTIA'
  | 'stpNear'
  | 'stpDOT'
  | 'stpATOM'
  | 'stpBTC'
  | 'stpCHZ'

export type ProductStakingNetwork =
  | 'ethereum'
  | 'optimism'
  | 'arbitrum'
  | 'polygon'
  | 'solana'
  | 'optimism-sepolia'
  | 'holesky'

export type ProductStakingContracts = {
  Airdrop: `0x${string}`
  Withdrawals: `0x${string}`
  Router: `0x${string}`
  StakeTogether: `0x${string}`
  StakeTogetherWrapper: `0x${string}`
}

export type TradingViewFiatData = {
  usd: string
  brl: string
  eur: string
}

export type ProductStaking = {
  id: number
  name: ProductStakingName
  newProductTag: boolean
  eigenPointsAvailable: boolean
  rampAsset: ProductAssetName
  tradingView: {
    symbol: string
    fiat: TradingViewFiatData
  }
  rampEnabled: boolean
  title: string
  symbol: ProductStakingSymbol
  apy: number
  description: string
  scan: string
  enabled: boolean
  urlRedirect: string
  networkAvailable: ProductStakingNetwork
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
  getMobulaAssetData: GetMobulaAssetData
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

export type ProductMarketAssetData = {
  data: {
    ath: number
    atl: number
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

export type GetMobulaAssetData = {
  asset: string
  blockchain: string
  symbol: string
}
