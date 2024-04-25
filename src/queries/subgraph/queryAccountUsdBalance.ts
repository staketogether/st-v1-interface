import { gql } from '@apollo/client'

export const queryAccountUsdBalance = gql`
  query AccountUsdBalance($accountAddress: String!) {
    accountUsdBalance(accountAddress: $accountAddress) {
      chainId
      symbol
      thumbnail
      balance
      decimals
      name
      contractAddress
    }
  }
`
