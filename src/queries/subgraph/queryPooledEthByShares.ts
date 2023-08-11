import { gql } from '@apollo/client'

export const queryPooledEthByShares = gql`
  query PooledEthCalcInfo {
    stakeTogether(id: "st") {
      totalPooledEther
      totalShares
    }
  }
`
