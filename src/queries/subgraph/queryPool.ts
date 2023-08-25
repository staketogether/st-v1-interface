import { gql } from '@apollo/client'

export const queryPool = gql`
  query Pool($id: String, $first: Int, $skip: Int) {
    pool(id: $id) {
      poolBalance
      marketShare
      receivedDelegationsCount
      address
      poolShares
      delegations(orderBy: delegationShares, orderDirection: desc, first: $first, skip: $skip) {
        delegationBalance
        delegate {
          address
        }
      }
    }
  }
`
