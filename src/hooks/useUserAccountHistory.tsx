import { stBackendClient } from '@/config/apollo'
import { UserAccountHistory, queryUserAccountHistory } from '@/queries/subgraph/queryUserAccountHistory'
import { useQuery } from '@apollo/client'

interface useSidebarAccountRewardsProps {
  walletAddress?: `0x${string}`
}

export default function useUserAccountHistory({ walletAddress }: useSidebarAccountRewardsProps) {
  const { data, loading, refetch } = useQuery<UserAccountHistory[]>(queryUserAccountHistory, {
    variables: { accountAddress: walletAddress?.toLowerCase() },
    skip: !walletAddress,
    client: stBackendClient
  })

  return {
    accountHistory: data ?? [],
    loading,
    refetch
  }
}
