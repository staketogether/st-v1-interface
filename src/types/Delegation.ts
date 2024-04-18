import { Account } from './Account'
import { PoolSubgraph } from './Pool'

export interface Delegation {
  id: string
  delegate: Account
  delegated: PoolSubgraph
  delegationBalance: bigint
  delegationShares: bigint
}

export interface DelegationMap {
  pool: `0x${string}`
  percentage: bigint
}
