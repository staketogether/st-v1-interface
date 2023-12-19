import { gql } from '@apollo/client'

export const queryContentfulFaq = gql`
  query FaqCollection($locale: String) {
    faqCollection(locale: $locale, order: orderIndex_ASC) {
      items {
        question
        answer
      }
    }
  }
`
