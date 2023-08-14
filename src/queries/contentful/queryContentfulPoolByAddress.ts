import { gql } from '@apollo/client'

export const queryContentfulPoolByAddress = gql`
  query PoolByAddress($walletAddress: String!, $locale: String) {
    poolCollection(where: { wallet: $walletAddress }, locale: $locale) {
      items {
        wallet
        name
        description
        video
        site
        facebook
        instagram
        linkedin
        twitter
        contract
        discord
        category {
          name
        }
      }
    }
  }
`
