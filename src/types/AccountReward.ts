import { Account } from '@/types/Account'

export type AccountReward = {
  account?: Account
  timestamp: number
  amount: bigint
  txHash: string
}
