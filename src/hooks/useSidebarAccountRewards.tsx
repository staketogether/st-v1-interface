import { stBackendClient } from '@/config/apollo'
import { SidebarAccountRewards, querySidebarAccountRewards } from '@/queries/subgraph/queryBackendAccountRewards'
import { useQuery } from '@apollo/client'

interface useSidebarAccountRewardsProps {
  walletAddress?: `0x${string}`
}

export default function useSidebarAccountRewards({ walletAddress }: useSidebarAccountRewardsProps) {
  const { data, loading, refetch } = useQuery<SidebarAccountRewards[]>(querySidebarAccountRewards, {
    variables: { accountAddress: walletAddress?.toLowerCase() },
    skip: !walletAddress,
    client: stBackendClient
  })

  return {
    accountRewards: data ?? [],
    loading,
    refetch
  }
}
