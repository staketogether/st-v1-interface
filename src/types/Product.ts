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
  airdrops: Airdrop[]
  enabled: boolean
  urlRedirect: string
}
