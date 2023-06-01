import { gql } from '@apollo/client'

export const queryAccountDelegations = gql`
  query Communities ($account: String!) {
    delegations(where: { delegate: $account }) {
      address
      delegate {
        address
        balance
        sentDelegationsCount
      }
      delegated {
        address
        delegatedShares
        rewardsShares
        delegatedBalance
        receivedDelegationsCount
      }
    }
  }
`
