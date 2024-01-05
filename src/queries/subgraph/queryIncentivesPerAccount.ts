import { gql } from '@apollo/client'

export const queryReportIncentives = gql`
  query reportIncentives($account: String) {
    reportIncentives(where: { account: $account }) {
      id
      account {
        address
      }
      poolOwnerAmount
      earlyAdopterAmount
      socialImpactAmount
      redeemBlock
      totalAmount
      reportBlock
      index
      sharesAmount
    }
  }
`
