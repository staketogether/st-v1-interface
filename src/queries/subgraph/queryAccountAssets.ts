import { gql } from '@apollo/client'

export const queryAccountAssets = gql`
  query AccountAssets($accountAddress: String!) {
    accountAssets(accountAddress: $accountAddress) {
      chainId
      symbol
      thumbnail
      balance
      balanceUsd
      decimals
      # imageUrl
      name
      contractAddress
    }
  }
`
