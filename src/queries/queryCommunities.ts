import { gql } from '@apollo/client'

export const queryCommunities = gql`
  query Communities {
    communities {
      address
    }
  }
`
