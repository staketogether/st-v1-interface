import { Delegation } from './Delegation'

export type Account = {
  id: string
  address: `0x${string}`
  shares: bigint
  originalBalance: bigint
  delegations: Delegation[]
  sentDelegationsCount: bigint
}
