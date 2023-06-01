import { gql } from '@apollo/client'

export const queryCommunityDelegations = gql`
  query CommunityDelegations($communityId: String!) {
    delegations(where: { delegated: $communityId }) {
      id
      delegationShares
      delegate {
        address
        shares
        sentDelegationsCount
        rewardsShares
      }
      delegated {
        address
        delegatedShares
        receivedDelegationsCount
      }
    }
  }
`
