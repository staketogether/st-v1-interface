import { useQuery } from '@apollo/client'
import { stBackendClient } from '@/config/apollo'
import { queryAccountUsdBalance } from '@/queries/subgraph/queryAccountUsdBalance'

export default function useAccountAssetsUsdBalance(accountAddress?: `0x${string}`) {
  const { data, loading } = useQuery<{ accountAssetsUsdBalance: string }>(queryAccountUsdBalance, {
    client: stBackendClient,
    variables: {
      accountAddress: accountAddress?.toLowerCase(),
    },
    skip: !accountAddress,
  })

  return { balance: data?.accountAssetsUsdBalance ?? "0", loading }
}
