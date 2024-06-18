import { useQuery } from '@apollo/client'
import { stBackendClient } from '@/config/apollo'
import { queryAccountStPoints } from '@/queries/subgraph/queryAccountStPoints'

export default function useAccountStPoints(accountAddress?: `0x${string}`) {
  const { data, loading } = useQuery<{ accountStPoints: string }>(queryAccountStPoints, {
    client: stBackendClient,
    variables: {
      accountAddress: accountAddress?.toLowerCase()
    },
    skip: !accountAddress
  })

  return { points: data?.accountStPoints ?? '0', loading }
}
