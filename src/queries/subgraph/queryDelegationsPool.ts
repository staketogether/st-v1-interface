import { gql } from '@apollo/client'

export const queryDelegationsPool = gql`
  query DelegationsPool($id: String) {
    pool(id: $id) {
      receivedDelegationsCount
      delegations(orderBy: delegationShares, first: 1000) {
        delegationBalance
        delegate {
          address
        }
      }
    }
  }
`
