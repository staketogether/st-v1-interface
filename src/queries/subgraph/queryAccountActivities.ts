import { gql } from '@apollo/client'

export const queryAccountActivities = gql`
  query AccountActivities($accountAddress: ID!, $first: Int, $skip: Int) {
    accountActivities(where: { account: $accountAddress }, first: $first, skip: $skip) {
      timestamp
      type
      amount
      txHash
    }
  }
`
