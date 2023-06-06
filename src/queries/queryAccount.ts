import { gql } from '@apollo/client'

export const queryAccount = gql`
  query Account($id: ID!) {
    account(id: $id) {
      address
      shares
      currentBalance
      rewardsBalance
      sentDelegationsCount
      delegations(orderBy: delegationShares, orderDirection: desc) {
        id
        delegationShares
        delegated {
          address
        }
      }
    }
  }
`
