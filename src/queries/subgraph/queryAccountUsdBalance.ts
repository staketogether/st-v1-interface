import { gql } from '@apollo/client'

export const queryAccountUsdBalance = gql`
  query AccountUsdBalance($accountAddress: String!) {
    accountAssetsUsdBalance(accountAddress: $accountAddress)
  }
`
