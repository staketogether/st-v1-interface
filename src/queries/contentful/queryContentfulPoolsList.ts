import { gql } from '@apollo/client'

export const queryContentfulPoolsList = gql`
  query PoolsList($locale: String) {
    poolCollection(locale: $locale) {
      items {
        wallet
        name
        sys {
          id
          publishedAt
        }
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
        status
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
