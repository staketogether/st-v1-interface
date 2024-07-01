export interface AssetNetwork {
  name: string
  chainId: number
  contractAddress: `0x${string}`
}

export interface Asset {
  currentPriceUsd?: number
  marketCap: number
  totalVolume: number
  priceChangePercentage1Y: number
  priceChange24h: number
  priceChangePercentage24h: number
  symbol: string
  name: string
  type: 'erc20' | 'native'
  isFanToken: boolean
  decimals: number
  totalSupply: number
  ref: string
  bridge?: {
    chainId: number
    tokenName: string
    contractAddress: string
  }
  imageUrl?: string
  description: {
    pt: string
    en: string
  }
  networks: AssetNetwork[]
  websiteUrl?: string
  blockscanUrl?: string
  twitterUrl?: string
}
