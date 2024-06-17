import { gql } from '@apollo/client'

export const queryAccountStPoints = gql`
  query AccountStPoints ($accountAddress: String!) {
    accountStPoints(accountAddress: $accountAddress)
  }
`