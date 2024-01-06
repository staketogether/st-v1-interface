import { gql } from '@apollo/client'

export const queryReportIncentivesPerReportBlock = gql`
  query incentivePerReportBlock($reportBlock: BigInt) {
    reportIncentives(where: { reportBlock: $reportBlock }, orderBy: sharesAmount, orderDirection: desc) {
      account {
        address
      }
      reportBlock
      sharesAmount
    }
  }
`
