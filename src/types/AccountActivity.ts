import { Account } from '@/types/Account'

export interface AccountActivity {
  account?: Account
  timestamp: number
  amount: string
  txHash: string
  type: string
}
