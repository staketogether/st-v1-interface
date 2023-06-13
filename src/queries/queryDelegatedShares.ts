import { gql } from '@apollo/client'

export const queryDelegatedShares = gql`
  query DelegatedShares($id: ID!) {
    delegation(id: $id) {
      delegationShares
    }
  }
`
