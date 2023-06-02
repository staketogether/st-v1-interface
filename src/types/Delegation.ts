import { BigNumber } from 'ethers'
import { Account } from './Account'
import { Community } from './Community'

export type Delegation = {
  __typename: 'Delegation'
  id: string
  delegate: Account
  delegated: Community
  delegationShares: BigNumber
}
