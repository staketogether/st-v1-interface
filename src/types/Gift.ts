export type Gift = {
  id: string
  type: 'coffee' | 'breakfast'
  data: number
  amount: bigint
  claimed: boolean
  txHash: string
  address: `0x${string}`
  winner: `0x${string}`
}
