import { gql } from '@apollo/client'

export const queryContentfulPoolsList = gql`
  query PoolsList($locale: String) {
    poolCollection(locale: $locale) {
      items {
        wallet
        logo {
          url
          fileName
        }
        name
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
        discord_name
        discord
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
