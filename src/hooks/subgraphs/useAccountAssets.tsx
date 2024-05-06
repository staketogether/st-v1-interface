import { useQuery } from '@apollo/client'
import { queryAccountAssets } from '@/queries/subgraph/queryAccountAssets'
import { AccountAsset } from '@/types/AccountAsset'
import { stBackendClient } from '@/config/apollo'

export default function useAccountAssets(accountAddress?: `0x${string}`) {
  const { data, loading } = useQuery<{ accountAssets: AccountAsset[] }>(queryAccountAssets, {
    client: stBackendClient,
    variables: {
      accountAddress: accountAddress?.toLowerCase()
    },
    skip: !accountAddress
  })

  return { accountAssets: data?.accountAssets ?? [], loading }
}
