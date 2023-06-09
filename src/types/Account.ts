import { Delegation } from './Delegation'

export type Account = {
  id: string
  address: `0x${string}`
  shares: string
  delegations: Delegation[]
  sentDelegationsCount: number
}
