import { gql } from '@apollo/client'

export const queryReportIncentivesPerAccount = gql`
  query AccountClaimableReports($accountAddress: String) {
    accountClaimableReports(where: { account: $accountAddress }, orderBy: reportBlock, orderDirection: asc) {
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
