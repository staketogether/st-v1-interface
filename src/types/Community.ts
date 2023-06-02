import { BigNumber } from 'ethers'
import { Account } from './Account'
import { Delegation } from './Delegation'

export type Community = {
  __typename: 'Community'
  id: string
  account: Account
  active: boolean
  delegatedShares: BigNumber
  rewardsShares: BigNumber
  delegatedBalance: BigNumber
  delegations: Delegation[]
  receivedDelegationsCount: number
} & ENSCommunity

export type ENSCommunity = {
  address: `0x${string}`
  name?: string
  avatar?: string
}
