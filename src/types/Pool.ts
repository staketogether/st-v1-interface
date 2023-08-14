import { Account } from './Account'
import { Delegation } from './Delegation'

export type PoolSubgraph = {
  marketShare: bigint
  id: string
  account: Account
  active: boolean
  poolBalance: bigint
  delegations: Delegation[]
  receivedDelegationsCount: bigint
} & ENSPool

export type ENSPool = {
  address: `0x${string}`
  name?: string
  avatar?: string
}

export type Pool = {
  type?: string
} & PoolSubgraph
