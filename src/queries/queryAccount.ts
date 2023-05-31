import { gql } from '@apollo/client'

export const queryAccount = gql`
  query Account($id: ID!) {
    account(id: $id) {
      address
      sharesEther
      rewardsSharesEther
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
