import { gql } from '@apollo/client'

export const queryFeeStakeEntry = gql`
  query StakeEntryFee {
    fee(id: "stakeEntry") {
      id
      value
      allocations
    }
  }
`
