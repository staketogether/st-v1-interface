import { gql } from '@apollo/client'

export const queryContentfulPoolsList = gql`
  query PoolsList($locale: String) {
    poolCollection(locale: $locale) {
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
