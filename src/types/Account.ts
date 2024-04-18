import { Delegation } from './Delegation'

export interface Account {
  id: string
  address: `0x${string}`
  balance: bigint
  shares: bigint
  totalDeposited: string
  totalRewards: bigint
  profitPercentage: bigint
  delegations: Delegation[]
  sentDelegationsCount: bigint
}

export interface AccountDelegations {
  sentDelegationsCount: bigint
  shares: bigint
  delegations: {
    delegated: {
      address: `0x${string}`
    }
    delegationShares: bigint
    delegationBalance: bigint
  }[]
}
