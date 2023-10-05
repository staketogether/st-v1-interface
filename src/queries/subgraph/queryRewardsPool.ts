import { gql } from '@apollo/client'

export const queryRewardsPool = gql`
  query RewardsPool($poolId: String, $first: Int, $skip: Int) {
    poolRewards(where: { pool: $poolId }, orderBy: timestamp, orderDirection: desc, first: $first, skip: $skip) {
      id
      txHash
      amount
      timestamp
      accountsCount
    }
  }
`
