export type StakingProductIcon =
  | 'ethereum'
  | 'EthereumRestaking'
  | 'polygon'
  | 'solana'
  | 'celestia'
  | 'cosmos'
  | 'near'
  | 'polkadot'

export type StakingProduct =
  | 'ethereum'
  | 'restaking'
  | 'polygon'
  | 'solana'
  | 'celestia'
  | 'cosmos'
  | 'near'
  | 'polkadot'

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
  | 'stpRETH'
  | 'stpPOL'
  | 'stpSOL'
  | 'stpTIA'
  | 'stpNear'
  | 'stpKSM'
  | 'stpATOM'

export type Network = 'ethereum' | 'optimism' | 'arbitrum' | 'polygon' | 'solana'

export type NetworkWrap = {
  network: Network
  enabled: boolean
}

export type Product = {
  id: number
  name: StakingProduct
  title: string
  symbol: ProductSymbol
  icon: StakingProductIcon
  networks: NetworkWrap[]
  apy: number
  description: string
  scan: string
  contractAddress: `0x${string}`
  enabled: boolean
  urlRedirect: string
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
