import { gql } from '@apollo/client'

export const queryPools = gql`
  query Pools {
    pools(orderBy: poolBalance, orderDirection: desc, where: { listed: true }) {
      id
      address
      receivedDelegationsCount
      poolBalance
      totalRewards
    }
  }
`
