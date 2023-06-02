import { BigNumber } from 'ethers'
import { Delegation } from './Delegation'

export type Account = {
  id: string
  address: `0x${string}`
  shares: BigNumber
  currentBalance: BigNumber
  rewardsBalance: BigNumber
  delegations: Delegation[]
  sentDelegationsCount: number
}
