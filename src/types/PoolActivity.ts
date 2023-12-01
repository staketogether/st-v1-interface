export type PoolActivity = {
  type: string
  timestamp: number
  account: {
    address: string
  }
  amount: bigint
  txHash: string
}
