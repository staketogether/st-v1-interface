import { gql } from '@apollo/client'

export interface SidebarAccountRewards {
  amount: number
  chainId: number
  timestamp: number
  token: string
  txHash: string
}

export const querySidebarAccountRewards = gql`
  query queryBackendAccountRewards($accountAddress: String!) {
    accountRewards(accountAddress: $accountAddress) {
      amount
      chainId
      timestamp
      token
      txHash
    }
  }
`
