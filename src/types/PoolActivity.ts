export interface PoolActivity {
  type: string
  timestamp: number
  account: {
    address: string
  }
  amount: bigint
  txHash: string
}
