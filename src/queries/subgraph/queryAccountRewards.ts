import { gql } from '@apollo/client'

export const queryAccountRewards = gql`
  query AccountRewards($accountAddress: ID!) {
    accountRewards(where: {account: $accountAddress}) {
      timestamp
      amount
      txHash
    }
  }
`
