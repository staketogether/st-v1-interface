import { gql } from '@apollo/client'

export const queryAccount = gql`
  query Account($id: String) {
    account(id: $id) {
      address
      delegates(where: { delegator: $id }, orderBy: shares) {
        delegated {
          address
          delegatedAmount
        }
      }
    }
  }
`
