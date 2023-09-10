import { gql } from '@apollo/client'

export const queryContentfulPoolByAddress = gql`
  query PoolByAddress($walletAddress: String!, $locale: String) {
    poolCollection(where: { wallet: $walletAddress }, locale: $locale) {
      items {
        wallet
        name
        logo {
          url
          fileName
        }
        category {
          name
        }
        cover {
          url
          fileName
        }
        video
        image {
          url
          fileName
        }
        description
        site
        twitter
        instagram
        youtube
        discord
        discordName
        gotas
        lens
        facebook
        linkedin
        telegram
        contract
      }
    }
  }
`
