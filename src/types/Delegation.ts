import { Account } from './Account'
import { PoolSubgraph } from './Pool'

export type Delegation = {
  id: string
  delegate: Account
  delegated: PoolSubgraph
  delegationBalance: bigint
}
