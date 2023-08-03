import { gql } from '@apollo/client'

export const queryStakeTogether = gql`
  query StakeTogether {
    stakeTogether(id: "st") {
      totalPooledEther
      contractBalance
      liquidityBalance
      beaconBalance
    }
  }
`
