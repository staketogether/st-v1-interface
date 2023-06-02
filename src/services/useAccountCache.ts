import { Community } from "@/types/Community";
import { apolloClient } from "@/config/apollo";
import { queryAccount } from "@/queries/queryAccount";
import { Account } from "@/types/Account";

export const useAccountCache = () => {
  return {
    addStake: (community: Community, account: Account, stakeAmount: string) => {
      const hasThisMember = community.delegations.some((delegation) => delegation.delegate.address === account.address.toLowerCase())

      apolloClient.writeQuery({
        query: queryAccount,
        data: {
          account: {
            __typename: 'Account',
            id: account.id,
            address: account.address,
            shares: account.shares.add(stakeAmount),
            sentDelegationsCount: hasThisMember ? account.sentDelegationsCount : account.sentDelegationsCount + 1,
          }
        }
      })
    },
    withdrawStake: (community: Community, account: Account, stakeAmount: string) => {
      const hasExited = community.delegatedShares.sub(stakeAmount).isZero()

      apolloClient.writeQuery({
        query: queryAccount,
        data: {
          account: {
            __typename: 'Account',
            id: account.id,
            address: account.address,
            shares: account.shares.sub(stakeAmount),
            sentDelegationsCount: !hasExited ? account.sentDelegationsCount : account.sentDelegationsCount - 1,
          }
        }
      })
    }
  }
}
