import { gql } from '@apollo/client'

export const queryCommunity = gql`
  query Community($id: String) {
    community(id: $id) {
      id
      address
      delegatedShares
      rewardsShares
      receivedDelegationsCount
      delegations {
        id
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
  }
`
