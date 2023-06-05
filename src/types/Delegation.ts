import { BigNumber } from 'ethers'
import { Account } from './Account'
import { Pool } from './Pool'

export type Delegation = {
  id: string
  delegate: Account
  delegated: Pool
  delegationShares: BigNumber
}
