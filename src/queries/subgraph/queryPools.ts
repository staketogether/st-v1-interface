import { gql } from '@apollo/client'

export const queryPools = gql`
  query Pools {
    pools(
      orderBy: poolBalance
      orderDirection: desc
      where: { listed: true, poolBalance_gte: 100000000000000000 }
    ) {
      id
      address
      receivedDelegationsCount
      poolBalance
      totalRewards
    }
  }
`
