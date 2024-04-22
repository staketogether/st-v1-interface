import { getSubgraphClient } from '@/config/apollo'
import { queryAccount } from '@/queries/subgraph/queryAccount'
import { Account } from '@/types/Account'
import { useQuery } from '@apollo/client'
import { Staking } from '@/types/Staking'

interface useLsdBalanceProps {
  walletAddress?: `0x${string}`
  product: Staking
  chainId: number
}

export default function useLsdBalance({ walletAddress, product }: useLsdBalanceProps) {
  const subgraphClient = getSubgraphClient({ stakingId: product.id })

  const { data, loading } = useQuery<{ account: Account }>(queryAccount, {
    variables: { id: walletAddress?.toLowerCase() },
    skip: !walletAddress,
    client: subgraphClient
  })

  return {
    accountBalance: data?.account?.balance ?? 0n,
    isLoading: loading
  }
}
