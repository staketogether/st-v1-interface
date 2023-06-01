import { gql } from '@apollo/client'

export const queryAccountDelegations = gql`
  query AccountDelegations($account: String!) {
    delegations(where: { delegate: $account }) {
      delegationShares
      delegate {
        address
        shares
        sentDelegationsCount
        rewardsShares
      }
      delegated {
        address
        delegatedShares
        receivedDelegationsCount
      }
    }
  }
`
