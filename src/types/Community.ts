import { BigNumber } from 'ethers'
import { Delegation } from './Delegation'

export type Community = {
  address: `0x${string}`
  name?: string
  avatar?: string

  active: boolean
  delegatedShares: BigNumber
  delegatedAmount: BigNumber
  delegates: Delegation[]

  rewardsShares: BigNumber
  rewardsAmount: BigNumber

  blockNumber: BigNumber
  blockTimestamp: BigNumber
  transactionHash: string
}
