import { getSubgraphClient } from '@/config/apollo'
import { chainConfigByChainId } from '@/config/chain'
import { Account } from '@/types/Account'
import { useQuery } from '@apollo/client'
import { Product } from '@/types/Product'
import { queryAccount } from '@/queries/subgraph/queryAccount'

type useLsdBalanceProps = {
  walletAddress?: `0x${string}`
  product: Product
  chainId: number
}

export default function useLsdBalance({ walletAddress, product, chainId }: useLsdBalanceProps) {
  const { isTestnet } = chainConfigByChainId(chainId)
  const subgraphClient = getSubgraphClient({ productName: product.name, isTestnet })

  const { data, loading } = useQuery<{ account: Account }>(queryAccount, {
    variables: { id: walletAddress?.toLowerCase() },
    skip: !walletAddress,
    client: subgraphClient
  })

  return {
    accountBalance: data?.account?.balance || 0n,
    isLoading: loading
  }
}
