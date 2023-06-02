import { BigNumber } from 'ethers'
import { Delegation } from './Delegation'

export type Account = {
  __typename: 'Account'
  id: string
  address: `0x${string}`
  shares: BigNumber
  rewardsShares: BigNumber
  delegations: Delegation[]
  balance: BigNumber
  sentDelegationsCount: number
}
