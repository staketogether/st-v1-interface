import { gql } from '@apollo/client'

export const queryReportIncentivesPerAccount = gql`
  query AccountClaimableReports($accountAddress: String) {
    accountClaimableReports(
      where: { account: "0xe427f0640e5d5d04efcf43e12b8ce570d8ec12ea" }
      orderBy: reportBlock
      orderDirection: asc
    ) {
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
