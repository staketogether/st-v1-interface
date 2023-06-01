import { BigNumber } from 'ethers'
import { Delegation } from './Delegation'

export type Account = {
  id: string
  address: `0x${string}`
  shares: BigNumber
  rewardsShares: BigNumber
  delegations: Delegation[]
  balance: BigNumber
  sentDelegationsCount: number
}
