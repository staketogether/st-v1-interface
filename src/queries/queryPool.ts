import { gql } from '@apollo/client'

export const queryPool = gql`
  query Pool($id: String) {
    pool(id: $id) {
      address
      delegatedShares
      rewardsShares
      receivedDelegationsCount

      delegations(orderBy: delegationShares, orderDirection: desc) {
        delegationShares
        delegate {
          address
        }
      }
    }
  }
`
