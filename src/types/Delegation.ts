import { BigNumber } from 'ethers'
import { Account } from './Account'
import { Community } from './Community'

export type DelegationOld = {
  account: `0x${string}`
  amount: BigNumber
}

export type Delegation = {
  id: string
  st: string

  delegator: Account
  delegated: Community

  shares: BigNumber
  amount: BigNumber

  blockNumber: BigNumber
  blockTimestamp: BigNumber
  transactionHash: string
}
