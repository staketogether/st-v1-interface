import { useQuery } from '@apollo/client'
import { stBackendClient } from '@/config/apollo'
import { queryAccountElPoints } from '@/queries/subgraph/queryAccountElPoints'

export default function useAccountElPoints(accountAddress?: `0x${string}`) {
  const { data, loading } = useQuery<{ accountElPoints: string }>(queryAccountElPoints, {
    client: stBackendClient,
    variables: {
      accountAddress: accountAddress?.toLowerCase()
    },
    skip: !accountAddress
  })

  return { elPoints: data?.accountElPoints, loading }
}