export type StakingProduct =
  | 'ethereum'
  | 'EthereumRestaking'
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

export type Network = 'ethereum' | 'optimism' | 'arbitrum' | 'polygon' | 'solana'

export type NetworkWrap = {
  network: Network
  enabled: boolean
}

export type Products = {
  id: number
  name: string
  symbol: string
  icon: StakingProduct
  networks: NetworkWrap[]
  apy: number
  airdrops: Airdrop[]
  enabled: boolean
  urlRedirect: string
}
