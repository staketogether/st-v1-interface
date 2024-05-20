import { gql } from '@apollo/client'

export const queryAccountAssets = gql`
  query AccountAssets($accountAddress: String!) {
    accountAssets(accountAddress: $accountAddress) {
      chainId
      symbol
      thumbnail
      balance
      decimals
      # imageUrl
      name
      contractAddress
    }
  }
`
