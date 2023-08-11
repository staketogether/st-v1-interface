import { gql } from '@apollo/client'

export const queryPoolActivities = gql`
  query poolActivities($poolAddress: String) {
    poolActivities(where: { pool: $poolAddress }) {
      type
      timestamp
      amount
      txHash
    }
  }
`
