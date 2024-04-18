import { Account } from '@/types/Account'

export interface AccountReward {
  account?: Account
  timestamp: number
  amount: bigint
  txHash: string
}
