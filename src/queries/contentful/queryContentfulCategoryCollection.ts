import { gql } from '@apollo/client'

export const queryContentfulCategoryCollection = gql`
  query CategoryCollection($locale: String) {
    categoryCollection {
      items {
        name(locale: $locale)
      }
    }
  }
`
