import { gql } from '@apollo/client'

export const queryPools = gql`
  query Pools {
    pools(orderBy: rewardsShares, orderDirection: desc, where: { active: true }) {
      id
      address
      delegatedShares
      rewardsShares
      receivedDelegationsCount
    }
  }
`
