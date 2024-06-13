export interface Transaction {
  data: `0x${string}`
  to: `0x${string}`
  value: bigint
  from: string
  chainId: number
  gasPrice: bigint
  gasLimit: bigint
}

export interface Bridge {
  tx: Transaction
  executionDuration: number
  approvalAddress: `0x${string}`
}

export interface PaymentDetails {
  id: string
  due: string
  paymentWalletAddress: `0x${string}`
  maximumTokenAmount: string
  minimumTokenAmount: string
  token: string
  chain: string
  bridge: Bridge
}
