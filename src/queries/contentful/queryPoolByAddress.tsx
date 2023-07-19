import { gql } from '@apollo/client'

export const queryPoolByAddress = gql`
  query Account($walletAddress: String!, $locale: String) {
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
      }
    }
  }
`
