import { gql } from '@apollo/client'

export const queryAccountReportMerkleData = gql`
  query AccountReportMerkleData($accountAddress: String!, $chainId: Int!, $reportBlock: BigInt!) {
    accountReportMerkleData(account: $accountAddress, chainId: $chainId, reportBlock: $reportBlock) {
      account
      index
      proof
      reportBlock
      sharesAmount
      weiAmount
    }
  }
`
