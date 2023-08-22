import { gql } from '@apollo/client'

export const queryAccountDelegations = gql`
  query AccountDelegations($id: ID!) {
    account(id: $id) {
      sentDelegationsCount
      shares
      delegations(orderBy: delegationShares) {
        delegated {
          address
        }
        delegationShares
        delegationBalance
      }
    }
  }
`
