export interface MobulaAsset {
  id: 'eth-mainnet' | 'eth-op' | 'btc-op'
  asset: string
  symbol: string
  blockchain: string
  filter: string
}
