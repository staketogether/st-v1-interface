import { BigNumber } from 'ethers'
import { Delegation } from './Delegation'

export type Account = {
  id: string
  st: string

  address: `0x${string}`

  shares: BigNumber
  rewardsShares: BigNumber

  delegations: Delegation[]
}
