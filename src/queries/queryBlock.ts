import { gql } from '@apollo/client'

export const queryBlock = gql`
  query Block() {
  _meta {
    block {
      number
    }
  }
}
`
