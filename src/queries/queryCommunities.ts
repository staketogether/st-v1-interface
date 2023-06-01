import { gql } from '@apollo/client'

export const queryCommunities = gql`
  query Communities {
    communities(orderBy: rewardsShares, orderDirection: desc, where: { active: true }) {
      address
      delegatedShares
      rewardsShares
      delegatedBalance
      receivedDelegationsCount
    }
  }
`
