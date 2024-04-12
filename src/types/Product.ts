export type StakingProductIcon =
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

export type StakingProduct =
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

export type Airdrop =
  | 'layerZero'
  | 'eigenLayer'
  | 'stakeTogether'
  | 'polygon'
  | 'solana'
  | 'celestia'
  | 'cosmos'
  | 'near'
  | 'polkadot'
  | 'ethereum'

export type ProductSymbol =
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

export type Network =
  | 'ethereum'
  | 'optimism'
  | 'arbitrum'
  | 'polygon'
  | 'solana'
  | 'optimism-sepolia'
  | 'holesky'

export type NetworkWrap = {
  network: Network
  enabled: boolean
}

export type Contracts = {
  Airdrop: `0x${string}`
  Withdrawals: `0x${string}`
  Router: `0x${string}`
  StakeTogether: `0x${string}`
  StakeTogetherWrapper: `0x${string}`
}

export type Product = {
  id: number
  name: StakingProduct
  newProductTag: boolean
  eigenPointsAvailable: boolean
  ramp: {
    chainId: number
    minDeposit: number
    bridge?: {
      fromChainId: number
      fromToken: string
      toChainId: number
      toToken: string
    }
  }
  rampEnabled: boolean
  title: string
  symbol: ProductSymbol
  networks: NetworkWrap[]
  apy: number
  description: string
  scan: string
  enabled: boolean
  urlRedirect: string
  networkAvailable: Network
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
    testnet: Contracts
    mainnet: Contracts
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
