import { gql } from '@apollo/client'

export interface UserAccountHistory {
  amount: number
  chainId: number
  timestamp: number
  token: string
  txHash: string
}

export const queryUserAccountHistory = gql`
  query queryUserAccountHistory($accountAddress: String!) {
    accountActivities(accountAddress: $accountAddress) {
      amount
      additionalData {
        amountCollateral
        amountFiat
        amountFiat
        brlId
      }
      assetType
    }
  }
`
