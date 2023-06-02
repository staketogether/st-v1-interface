import { Community } from "@/types/Community";
import { apolloClient } from "@/config/apollo";
import { queryCommunity } from "@/queries/queryCommunity";
import { BigNumber } from "ethers";

export const useCommunityCache = () => {
  return {
    addStake: (community: Community, accountAddress: string, stakeAmount: string) => {
      const hasThisMember = community.delegations.some((delegation) => delegation.delegate.address === accountAddress.toLowerCase())

      const delegations = hasThisMember ? community.delegations : [{
        __typename: 'Delegation',
        id: `${accountAddress.toLowerCase()}-${community.address}`,
        delegationShares: BigNumber.from(stakeAmount),
        delegate: {
          __typename: 'Account',
          id: accountAddress.toLowerCase(),
          address: accountAddress.toLowerCase()
        }
      }, ...community.delegations]

      apolloClient.writeQuery({
        query: queryCommunity,
        data: {
          community: {
            __typename: 'Community',
            id: community,
            receivedDelegationsCount: hasThisMember ? community.receivedDelegationsCount : community.receivedDelegationsCount + 1,
            delegatedShares: community.delegatedShares.add(stakeAmount),
            delegations
          }
        }
      })
    },
    withdrawStake: (community: Community, accountAddress: string, stakeAmount: string) => {
      const hasExited = community.delegatedShares.sub(stakeAmount).isZero()

      const delegations = !hasExited ? community.delegations : community.delegations.filter((delegation) => delegation.delegate.address !== accountAddress.toLowerCase())

      apolloClient.writeQuery({
        query: queryCommunity,
        data: {
          community: {
            __typename: 'Community',
            id: community,
            receivedDelegationsCount: hasExited ? community.receivedDelegationsCount - 1 : community.receivedDelegationsCount,
            delegatedShares: community.delegatedShares.sub(stakeAmount),
            delegations
          }
        }
      })
    }
  }
}
