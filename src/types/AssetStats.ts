export interface AssetStats {
  currentPriceUsd: number
  imageUrl: string
  marketCap: number
  priceChange24h: number
  priceChangePercentage1Y: number
  priceChangePercentage24h: number
  ref: `${number}:0x${string}`
  totalSupply: number
  totalVolume: number
}
