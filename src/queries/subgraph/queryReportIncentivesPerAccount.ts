import { gql } from '@apollo/client'

export const queryReportIncentivesPerAccount = gql`
  {
    accountClaimableReports(where: { account: "0x726dbeb2a4ec157e82d53e4c6a747e1a9bdf39e0" }) {
      id
      reportBlock
      merkleRoot
      timestamp
      claimed
      account {
        address
      }
    }
  }
`
