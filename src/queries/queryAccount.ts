import { gql } from '@apollo/client'

export const queryAccount = gql`
  query Account($id: ID!) {
    account(id: $id) {
      address
      balance
      sentDelegationsCount
      delegations {
        id
        delegationShares
        delegated {
          address
        }
      }
    }
  }
`
