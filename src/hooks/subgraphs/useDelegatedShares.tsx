import { useQuery } from '@apollo/client'
import { queryDelegatedShares } from '@/queries/queryDelegatedShares'

export default function useDelegatedShares(
  walletAddress: `0x${string}`,
  communityDelegate: `0x${string}`
) {
  const { data, loading } = useQuery<{ delegation?: { delegationShares?: string } }>(
    queryDelegatedShares,
    {
      variables: { id: `${walletAddress.toLocaleLowerCase()}-${communityDelegate.toLocaleLowerCase()}` }
    }
  )

  return { delegationShares: data?.delegation?.delegationShares || '0', loading }
}
