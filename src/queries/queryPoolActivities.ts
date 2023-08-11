import { gql } from '@apollo/client'

export const queryPoolActivities = gql`
  query poolActivities($poolAddress: String) {
    poolActivities(where: { pool: $poolAddress }, orderBy: timestamp, orderDirection: desc) {
      type
      timestamp
      amount
      txHash
    }
  }
`
