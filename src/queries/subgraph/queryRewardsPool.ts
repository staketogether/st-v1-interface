import { gql } from '@apollo/client'

export const queryRewardsPool = gql`
  query RewardsPool($id: String, $first: Int, $skip: Int) {
    poolRewards(
      orderBy: timestamp
      orderDirection: desc
      first: $first
      skip: $skip
      where: { pool_: { id: "0xb6ad42d615759e50c8087849a2f6f0e2032f7085" } }
    ) {
      timestamp
      amount
      txHash
      account {
        address
      }
    }
  }
`
