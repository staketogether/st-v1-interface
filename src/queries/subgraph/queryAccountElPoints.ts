import { gql } from '@apollo/client'

export const queryAccountElPoints = gql`
  query AccountElPoints($accountAddress: String!) {
    accountElPoints(accountAddress: $accountAddress)
  }
`