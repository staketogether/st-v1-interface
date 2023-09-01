import { gql } from '@apollo/client'

export const queryContentfulPoolsList = gql`
  query PoolsList($locale: String) {
    poolCollection(locale: $locale) {
      items {
        wallet
        name
        logo {
          url
          fileName
        }
        cover {
          url
          fileName
        }
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
