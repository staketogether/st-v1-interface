export interface Network {
  chainId: number
  contractAddress: `0x${string}`
  name: string
}

export interface AssetData {
  currentPriceUsd: number
  imageUrl: string
  marketCap: number
  name: string
  networks: Network[]
  priceChangePercentage24h: number
  ref: string
  symbol: string
  totalVolume: number
}
