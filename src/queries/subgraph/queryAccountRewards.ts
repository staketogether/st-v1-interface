import { gql } from '@apollo/client'

export const queryAccountRewards = gql`
  query AccountActivities($accountAddress: ID!) {
    accountRewards(where: {account: $accountAddress}) {
      timestamp
      amount
      txHash
    }
  }
`
