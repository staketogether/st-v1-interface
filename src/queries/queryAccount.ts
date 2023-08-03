import { gql } from '@apollo/client'

export const queryAccount = gql`
  query Account($id: ID!) {
    account(id: $id) {
      address
      balance
      originalBalance
      rewardsBalance
      sentDelegationsCount
      delegations(orderBy: delegationShares, orderDirection: desc) {
        id
        delegationBalance
        delegated {
          address
        }
      }
    }
  }
`
