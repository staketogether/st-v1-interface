import { Account } from '@/types/Account'

export type AccountReward = {
  account?: Account
  timestamp: number
  amount: string
  txHash: string
}
