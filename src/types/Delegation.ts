import { BigNumber } from 'ethers'
import { Account } from './Account'
import { Community } from './Community'

export type Delegation = {
  id: string
  delegate: Account
  delegated: Community
  delegationShares: BigNumber
}
