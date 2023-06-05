import { BigNumber } from 'ethers'
import { Account } from './Account'
import { Delegation } from './Delegation'

export type Pool = {
  id: string
  account: Account
  active: boolean
  delegatedShares: BigNumber
  rewardsShares: BigNumber
  delegatedBalance: BigNumber
  delegations: Delegation[]
  receivedDelegationsCount: number
} & ENSPool

export type ENSPool = {
  address: `0x${string}`
  name?: string
  avatar?: string
}
