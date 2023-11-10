import { gql } from '@apollo/client'

export const queryContentfulCategoryCollection = gql`
  query CategoryCollection {
    categoryCollection {
      items {
        name
        sys {
          id
        }
      }
    }
  }
`
