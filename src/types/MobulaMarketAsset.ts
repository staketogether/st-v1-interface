export interface MobulaMarketAsset {
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

export interface MobulaMarketAssetResponse {
  data: MobulaMarketAsset;
}