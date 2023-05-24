import { gql } from '@apollo/client'

export const queryCommunitiesDelegations = gql`
  query CommunitiesDelegations {
    communities {
      address
      delegatedAmount
      rewardsAmount
      delegates {
        delegator {
          id
        }
      }
    }
  }
`
