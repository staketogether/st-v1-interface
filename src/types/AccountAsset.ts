export interface AccountAsset {
  chainId: number
  contractAddress: `0x${string}`
  symbol: string
  thumbnail?: string
  balance: string
  decimals: number
  name: string
}
