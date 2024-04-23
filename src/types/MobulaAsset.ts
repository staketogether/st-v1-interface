export interface MobulaAsset {
  id: 'eth-mainnet' | 'eth-op' | 'btc-op' | 'chz-chiliz' | 'op-op' | 'arb-arb' | 'matic-pol'
  asset: string
  symbol: string
  blockchain: string
  filter: string
}
