import { gql } from '@apollo/client'

export const queryDelegationShares = gql`
  query DelegationShares($id: ID!) {
    delegation(id: $id) {
      delegationShares
    }
  }
`
