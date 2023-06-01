import { gql } from '@apollo/client'

export const queryCommunity = gql`
  query Community($id: String) {
    community(id: $id) {
      id
      address
      delegatedShares
      rewardsShares
      receivedDelegationsCount
    }
  }
`
