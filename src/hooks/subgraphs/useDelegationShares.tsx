import { queryDelegationShares } from '@/queries/queryDelegatedShares'
import { useQuery } from '@apollo/client'
import usePooledEthByShares from '../contracts/usePooledEthByShares'

export default function useDelegationShares(walletAddress?: `0x${string}`, communityDelegate?: `0x${string}`) {
  const { data, loading, refetch } = useQuery<{ delegation?: { delegationShares?: string } }>(
    queryDelegationShares,
    {
      variables: { id: `${walletAddress?.toLocaleLowerCase()}-${communityDelegate?.toLocaleLowerCase()}` },
      skip: !walletAddress || !communityDelegate
    }
  )

  const { loading: delegatedSharesLoading } = usePooledEthByShares(
    data && data.delegation?.delegationShares ? data.delegation?.delegationShares : '0'
  )

  //TODO: trocar a integração quando o thegraph estiver ok
  return {
    delegationShares: data?.delegation?.delegationShares || '0',
    // delegationSharesEth: delegatedShares,
    delegationSharesEth: 106313078370738671n,
    loading: loading || delegatedSharesLoading,
    refetch
  }
}
