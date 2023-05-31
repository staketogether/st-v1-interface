import { BigNumber } from 'ethers'
import { Account } from './Account'
import { Delegation } from './Delegation'

export type Community = {
  id: string

  account: Account

  address: `0x${string}`
  active: boolean

  delegatedShares: BigNumber
  rewardsShares: BigNumber

  delegations: Delegation[]
} & ENSCommunity

export type ENSCommunity = {
  address: `0x${string}`
  name?: string
  avatar?: string
}
