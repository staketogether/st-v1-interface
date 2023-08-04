import { Delegation } from './Delegation'

export type Account = {
  id: string
  address: `0x${string}`
  balance: bigint
  originalBalance: string
  rewardsBalance: bigint
  delegations: Delegation[]
  sentDelegationsCount: bigint
}
