import { gql } from '@apollo/client'

export const queryPool = gql`
  query Pool($id: String, $first: Int, $skip: Int) {
    pool(id: $id) {
      address
      delegatedShares
      rewardsShares
      receivedDelegationsCount

      delegations(orderBy: delegationShares, orderDirection: desc, first: $first, skip: $skip) {
        delegationShares
        delegate {
          address
        }
      }
    }
  }
`
