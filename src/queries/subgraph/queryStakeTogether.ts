import { gql } from '@apollo/client'

export const queryStakeTogether = gql`
  query StakeTogether {
    stakeTogether(id: "st") {
      accountsCount
      poolsCount
      totalRewards
      totalIncentives
      totalValueLocked
      totalPooledEther
      contractBalance
      liquidityBalance
      beaconBalance
    }
  }
`
