import { gql } from '@apollo/client'

export const queryDelegationShares = gql`
  query PoolReceivedDelegationsByDelegate($collectionAddress: ID!, $userAddress: String) {
    pool(id: $collectionAddress) {
      delegations(where: { delegate_contains: $userAddress }) {
        delegationBalance
      }
    }
  }
`
