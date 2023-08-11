import { gql } from '@apollo/client'

export const queryAccountActivities = gql`
  query AccountActivities($accountAddress: ID!) {
    accountActivities(where: { account: $accountAddress }) {
      timestamp
      type
      amount
      txHash
    }
  }
`
