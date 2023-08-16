import { Account } from './Account'
import { PoolSubgraph } from './Pool'

export type Delegation = {
  id: string
  delegate: Account
  delegated: PoolSubgraph
  delegationBalance: bigint
  delegationShares: bigint
}

export type DelegationMap = {
  pool: `0x${string}`
  shares: bigint
}
