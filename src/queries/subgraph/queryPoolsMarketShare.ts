import { gql } from '@apollo/client'

export const queryPoolsMarketShare = gql`
  query Pools {
    pools(orderBy: poolBalance, orderDirection: desc, where: { listed: true }) {
      id
      marketShare
    }
  }
`
