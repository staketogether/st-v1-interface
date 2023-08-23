import { gql } from '@apollo/client'

export const queryPoolActivities = gql`
  query poolActivities($poolAddress: String) {
    poolActivities(
      where: { pool: $poolAddress }
      orderBy: timestamp
      orderDirection: desc
      first: $first
      skip: $skip
    ) {
      type
      timestamp
      amount
      txHash
    }
  }
`
