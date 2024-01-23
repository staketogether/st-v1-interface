import { gql } from '@apollo/client'

export const queryAccount = gql`
  query Account($id: ID!) {
    account(id: $id) {
      address
      balance
      shares
      totalDeposited
      totalRewards
      profitPercentage
      sentDelegationsCount
      delegations(orderBy: delegationShares, orderDirection: desc) {
        id
        delegationBalance
        delegationShares
        delegated {
          address
        }
      }
    }
  }
`
