import { queryDelegationShares } from '@/queries/queryDelegatedShares'
import { useQuery } from '@apollo/client'

export default function useDelegationShares(
  walletAddress: `0x${string}`,
  communityDelegate: `0x${string}`
) {
  const { data, loading } = useQuery<{ delegation?: { delegationShares?: string } }>(
    queryDelegationShares,
    {
      variables: { id: `${walletAddress.toLocaleLowerCase()}-${communityDelegate.toLocaleLowerCase()}` }
    }
  )

  return { delegationShares: data?.delegation?.delegationShares || '0', loading }
}
