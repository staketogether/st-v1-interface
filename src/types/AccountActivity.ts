import { Account } from '@/types/Account'

export type AccountActivity = {
  account?: Account
  timestamp: number
  amount: string
  txHash: string
  type: string
}
