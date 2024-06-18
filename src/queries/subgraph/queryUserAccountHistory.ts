import { gql } from '@apollo/client'

export interface UserAccountHistory {
  additionalData: {
    amountCollateral: string
    amountFiat: string
    amountTo: string
    brlId: number
    chainId: number
    chainTo: number
    tokenTo: `0x${string}`
  }
  amount: '100000000000000'
  assetType: 'staking' | 'asset'
  chainId: number
  createdAt: Date
  id: number
  token: string
  type: 'deposit' | 'withdraw'
}

export const queryUserAccountHistory = gql`
  query queryUserAccountHistory($accountAddress: String!) {
    accountActivities(accountAddress: $accountAddress) {
      additionalData {
        amountCollateral
        amountFiat
        amountTo
        brlId
        chainId
        chainTo
        tokeTo
      }
      amount
      assetType
      chainId
      createdAt
      id
      token
      type
    }
  }
`
