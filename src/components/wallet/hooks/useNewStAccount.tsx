import { getSubgraphClient } from '@/config/apollo'
import { chainConfigByChainId } from '@/config/chain'
import { queryAccountActivities } from '@/queries/subgraph/queryAccountActivities'
import { queryAccountRewards } from '@/queries/subgraph/queryAccountRewards'
import { AccountActivity } from '@/types/AccountActivity'
import { AccountReward } from '@/types/AccountReward'
import { ApolloClient, useQuery } from '@apollo/client'
import { NormalizedCacheObject } from '@apollo/client/cache/inmemory/types'
import { queryAccount } from '../../../queries/subgraph/queryAccount'
import { Account } from '../../../types/Account'
import { getAssetsByCategory } from '@/config/asset'
import { AssetCategory } from '@/types/Asset'
import { useEffect } from 'react'

interface StakingAccountProps {
  address?: `0x${string}`
  chainId: number
}

export default function useStakingAccount({ address, chainId }: StakingAccountProps) {
  const { isTestnet } = chainConfigByChainId(chainId)

  const stakingProducts = getAssetsByCategory(AssetCategory.Staking)

  const client = getSubgraphClient({ name: 'ethereum-stake', isTestnet })

  useEffect(() => {
    async function fetchAccountData(clientObj: ApolloClient<NormalizedCacheObject>, address: string) {
      try {
        const { data } = await client.query<{ account: Account }>({
          query: queryAccount,
          variables: { id: address.toLowerCase() }
        })
        return data.account
      } catch (error) {
        console.error('Error fetching account data', error)
        throw error
      }
    }
  }, [])

  const { data: accountData, loading } = useQuery<{ account: Account }>(queryAccount, {
    variables: { id: address?.toLowerCase() },
    skip: !address,
    client
  })

  const { data: activitiesData, loading: activitiesLoading } = useQuery<{
    accountActivities: AccountActivity[]
  }>(queryAccountActivities, {
    variables: { accountAddress: address?.toLowerCase(), first: 10, skip: 0 },
    skip: !address,
    client
  })

  const { data: rewardsData, loading: rewardsLoading } = useQuery<{ accountRewards: AccountReward[] }>(queryAccountRewards, {
    client,
    skip: !address,
    variables: {
      accountAddress: address?.toLowerCase()
    }
  })

  return {}
}
