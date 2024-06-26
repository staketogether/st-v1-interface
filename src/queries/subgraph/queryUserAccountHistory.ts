import { gql } from '@apollo/client'

export interface UserAccountHistory {
  additionalData: {
    amountCollateral: string
    amountFiat: number
    amountTo: string
    brlId: number
    chainId: number
    chainTo: number
    tokenTo: `0x${string}`
  }
  amount: bigint
  assetType: 'staking' | 'asset'
  chainId: number
  createdAt: Date
  id: number
  token: `0x${string}`
  type: 'deposit' | 'withdraw' | 'sell-crypto' | 'buy-crypto' | 'swap'
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
        tokenTo
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
