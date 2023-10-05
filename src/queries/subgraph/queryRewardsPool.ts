import { gql } from '@apollo/client'

export const queryRewardsPool = gql`
  query RewardsPool($id: String, $first: Int, $skip: Int) {
    poolRewards(id: $id, orderBy: timestamp, orderDirection: desc, first: $first, skip: $skip) {
      txHash
      amount
      timestamp
      accountsCount
    }
  }
`
