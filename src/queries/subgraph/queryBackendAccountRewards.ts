import { gql } from '@apollo/client'

export interface SidebarAccountRewards {
  amount: bigint
  chainId: number
  timestamp: number
  contractAddress: `0x${string}`
  txHash: string
}

export const querySidebarAccountRewards = gql`
  query queryBackendAccountRewards($accountAddress: String!) {
    accountRewards(accountAddress: $accountAddress) {
      amount
      chainId
      timestamp
      contractAddress
      txHash
    }
  }
`
