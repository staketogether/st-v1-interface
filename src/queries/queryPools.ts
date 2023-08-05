import { gql } from '@apollo/client'

export const queryPools = gql`
  query Pools {
    pools(orderBy: delegatedShares, orderDirection: desc, where: { active: true }, first: 9) {
      id
      address
      delegatedShares
      rewardsShares
      receivedDelegationsCount
    }
  }
`
