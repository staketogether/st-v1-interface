export interface AccountAsset {
  chainId: number
  contractAddress: string
  symbol: string
  thumbnail?: string
  balance: string
  balanceUsd: number
  imageUrl?: string
  decimals: number
  name: string
}
