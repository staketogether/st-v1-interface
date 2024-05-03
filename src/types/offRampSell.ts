export interface Transaction {
  data: string
  to: string
  value: string
  from: string
  chainId: number
  gasPrice: string
  gasLimit: string
}

export interface Bridge {
  tx: Transaction
  executionDuration: number
}

export interface PaymentDetails {
  id: string
  due: string
  paymentWalletAddress: string
  maximumTokenAmount: string
  minimumTokenAmount: string
  token: string
  chain: string
  bridge: Bridge
}
