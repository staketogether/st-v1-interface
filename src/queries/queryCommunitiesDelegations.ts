import { gql } from '@apollo/client'

export const queryCommunitiesDelegations = gql`
  query CommunitiesDelegations {
    communities {
      address
      delegatedShares
      rewardsShares
    }
  }
`
