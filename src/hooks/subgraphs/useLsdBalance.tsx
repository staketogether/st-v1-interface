import { getSubgraphClient } from '@/config/apollo'
import chainConfig from '@/config/chain'
import { Account } from '@/types/Account'
import { useQuery } from '@apollo/client'
import { Product } from '@/types/Product'
import { queryAccount } from '@/queries/subgraph/queryAccount'

type useLsdBalanceProps = {
  walletAddress?: `0x${string}`
  product: Product
}

export default function useLsdBalance({ walletAddress, product }: useLsdBalanceProps) {
  const { isTestnet } = chainConfig()
  const subgraphClient = getSubgraphClient({ productName: product.name, isTestnet })
  console.log(subgraphClient)
  const { data, loading } = useQuery<{ account: Account }>(queryAccount, {
    variables: { id: walletAddress?.toLowerCase() },
    skip: !walletAddress,
    client: subgraphClient
  })
  console.log(data)
  return {
    accountBalance: data?.account.balance || 0n,
    isLoading: loading
  }
}
