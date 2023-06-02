import { Community } from "@/types/Community";
import { apolloClient } from "@/config/apollo";
import { queryCommunity } from "@/queries/queryCommunity";
import { BigNumber, ethers } from "ethers";

interface DelegationCache {
  __typename: 'Delegation'
  id: string
  delegate: {
    __typename: 'Account'
    id: string
    address: string
  }
  delegationShares: BigNumber
}

export const useCommunityCache = () => {
  return {
    addStake: (community: Community, accountAddress: string, stakeAmount: string) => {
      const hasThisMember = community.delegations.some((delegation) => delegation.delegate.address === accountAddress.toLowerCase())
      console.log('hasThisMember?', hasThisMember)

      // Necessary workaround to deal with the delegationShares being a readonly property
      const delegations: DelegationCache[] = []

      if (hasThisMember) {
        community.delegations.forEach((delegation) => {
          console.log('community delegation', delegation, ethers.utils.parseUnits(stakeAmount))
          delegations.push({
            __typename: 'Delegation',
            id: delegation.id,
            delegate: {
              __typename: 'Account',
              id: accountAddress.toLowerCase(),
              address: accountAddress.toLowerCase()
            },
            delegationShares: delegation.delegate.address === accountAddress ? BigNumber.from(delegation.delegationShares).add(ethers.utils.parseUnits(stakeAmount)) : delegation.delegationShares,
          })
        })
      } else {
        delegations.push({
          __typename: 'Delegation',
          id: `${accountAddress.toLowerCase()}-${community.address}`,
          delegationShares: BigNumber.from(ethers.utils.parseUnits(stakeAmount)),
          delegate: {
            __typename: 'Account',
            id: accountAddress.toLowerCase(),
            address: accountAddress.toLowerCase()
          }
        })
      }

      apolloClient.writeQuery({
        query: queryCommunity,
        data: {
          community: {
            __typename: 'Community',
            id: community,
            receivedDelegationsCount: hasThisMember ? community.receivedDelegationsCount : community.receivedDelegationsCount + 1,
            delegatedShares: BigNumber.from(community.delegatedShares).add(ethers.utils.parseUnits(stakeAmount)),
            delegations
          }
        }
      })
    },
    withdrawStake: (community: Community, accountAddress: string, stakeAmount: string) => {
      const hasExited = BigNumber.from(community.delegatedShares).sub(ethers.utils.parseUnits(stakeAmount)).isZero()

      let delegations: DelegationCache[] = []

      if (!hasExited) {
        community.delegations.forEach((delegation) => {
          delegations.push({
            __typename: 'Delegation',
            id: delegation.id,
            delegate: {
              __typename: 'Account',
              id: accountAddress.toLowerCase(),
              address: accountAddress.toLowerCase()
            },
            delegationShares: delegation.delegate.address === accountAddress.toLowerCase() ? BigNumber.from(delegation.delegationShares).sub(ethers.utils.parseUnits(stakeAmount)) : delegation.delegationShares,
          })
        })
      }

      delegations = !hasExited ? delegations : delegations.filter((delegation) => delegation.delegate.address !== accountAddress.toLowerCase())

      apolloClient.writeQuery({
        query: queryCommunity,
        data: {
          community: {
            __typename: 'Community',
            id: community,
            receivedDelegationsCount: hasExited ? community.receivedDelegationsCount - 1 : community.receivedDelegationsCount,
            delegatedShares: BigNumber.from(community.delegatedShares).sub(ethers.utils.parseUnits(stakeAmount)),
            delegations
          }
        }
      })
    }
  }
}
