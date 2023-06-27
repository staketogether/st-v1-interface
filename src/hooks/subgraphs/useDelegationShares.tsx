import { queryDelegationShares } from '@/queries/queryDelegatedShares'
import { useQuery } from '@apollo/client'
import usePooledEthByShares from '../contracts/usePooledEthByShares'

export default function useDelegationShares(
  walletAddress: `0x${string}`,
  communityDelegate: `0x${string}`
) {
  const { data, loading } = useQuery<{ delegation?: { delegationShares?: bigint } }>(
    queryDelegationShares,
    {
      variables: { id: `${walletAddress.toLocaleLowerCase()}-${communityDelegate.toLocaleLowerCase()}` }
    }
  )

  const { balance: delegatedShares, loading: delegatedSharesLoading } = usePooledEthByShares(
    data && data.delegation?.delegationShares ? data.delegation?.delegationShares : 0n
  )

  return {
    delegationShares: data?.delegation?.delegationShares || '0',
    delegationSharesFormatted: delegatedShares,
    loading: loading || delegatedSharesLoading
  }
}
