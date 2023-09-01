import { gql } from '@apollo/client'

export const queryContentfulPoolByAddress = gql`
  query PoolByAddress($walletAddress: String!, $locale: String) {
    poolCollection(where: { wallet: $walletAddress }, locale: $locale) {
      items {
        wallet
        name
        description
        logo {
          url
          fileName
        }
        cover {
          url
          fileName
        }
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
