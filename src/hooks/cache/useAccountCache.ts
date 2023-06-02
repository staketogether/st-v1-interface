import { Community } from "@/types/Community";
import { apolloClient } from "@/config/apollo";
import { queryAccount } from "@/queries/queryAccount";
import { Account } from "@/types/Account";
import { BigNumber, ethers } from "ethers";

interface DelegationCache {
  __typename: 'Delegation'
  id: string
  delegated: {
    __typename: 'Community'
    id: string
    address: string
  }
  delegationShares: BigNumber
}

export const useAccountCache = () => {
  return {
    addStake: (community: Community, account: Account, stakeAmount: string) => {
      const hasThisMember = account.delegations.some((delegation) => delegation.delegated.address === community.address.toLowerCase())
      console.log('account hasThisMember?', hasThisMember)

      // Necessary workaround to deal with the delegationShares being a readonly property
      const delegations: DelegationCache[] = []

      if (hasThisMember) {
        account.delegations.forEach((delegation) => {
          console.log('account delegation', delegation.delegationShares.toString(), ethers.utils.parseUnits(stakeAmount).toString())
          delegations.push({
            __typename: 'Delegation',
            id: delegation.id,
            delegated: {
              __typename: 'Community',
              id: community.address,
              address: community.address
            },
            delegationShares: delegation.delegated.address === community.address ? BigNumber.from(delegation.delegationShares).add(ethers.utils.parseUnits(stakeAmount)) : delegation.delegationShares,
          })
        })
      } else {
        delegations.push({
          __typename: 'Delegation',
          id: `${account.address.toLowerCase()}-${community.address}`,
          delegationShares: BigNumber.from(ethers.utils.parseUnits(stakeAmount)),
          delegated: {
            __typename: 'Community',
            id: community.address,
            address: community.address
          }
        })
      }

      apolloClient.writeQuery({
        query: queryAccount,
        data: {
          account: {
            __typename: 'Account',
            id: account.id,
            address: account.address,
            shares: BigNumber.from(account.shares).add(ethers.utils.parseUnits(stakeAmount)),
            sentDelegationsCount: hasThisMember ? account.sentDelegationsCount : account.sentDelegationsCount + 1,
            delegations
          }
        }
      })
    },
    withdrawStake: (community: Community, account: Account, stakeAmount: string) => {
      const hasExited = BigNumber.from(community.delegatedShares).sub(ethers.utils.parseUnits(stakeAmount)).isZero()

      let delegations: DelegationCache[] = []

      if (!hasExited) {
        account.delegations.forEach((delegation) => {
          delegations.push({
            __typename: 'Delegation',
            id: delegation.id,
            delegated: {
              __typename: 'Community',
              id: community.address,
              address: community.address
            },
            delegationShares: delegation.delegated.address === community.address ? BigNumber.from(delegation.delegationShares).sub(ethers.utils.parseUnits(stakeAmount)) : delegation.delegationShares,
          })
        })
      }

      delegations = !hasExited ? delegations : delegations.filter((delegation) => delegation.delegated.address !== community.address)

      apolloClient.writeQuery({
        query: queryAccount,
        data: {
          account: {
            __typename: 'Account',
            id: account.id,
            address: account.address,
            shares: BigNumber.from(account.shares).sub(ethers.utils.parseUnits(stakeAmount)),
            sentDelegationsCount: !hasExited ? account.sentDelegationsCount : account.sentDelegationsCount - 1,
            delegations
          }
        }
      })
    }
  }
}
