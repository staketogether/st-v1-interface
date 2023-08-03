import { queryDelegationShares } from '@/queries/queryDelegatedShares'
import { useQuery } from '@apollo/client'

export default function useDelegationShares(walletAddress?: `0x${string}`, communityDelegate?: `0x${string}`) {
  console.log(walletAddress?.toLocaleLowerCase())
  const { data, loading, refetch } = useQuery<{ pool?: { delegations: [{ delegationBalance: bigint }] } }>(
    queryDelegationShares,
    {
      variables: {
        collectionAddress: communityDelegate?.toLocaleLowerCase(),
        userAddress: walletAddress?.toLocaleLowerCase()
      },
      skip: !walletAddress || !communityDelegate
    }
  )

  return {
    delegationBalance: data?.pool?.delegations[0].delegationBalance || 0n,
    loading: loading,
    refetch
  }
}
