export interface AccountAsset {
  chainId: number
  contractAddress: string
  symbol: string
  thumbnail?: string
  balance: string
  imageUrl?: string
  decimals: number
  name: string
}
