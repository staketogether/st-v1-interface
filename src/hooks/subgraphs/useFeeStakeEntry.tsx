import { queryFeeStakeEntry } from '@/queries/subgraph/queryFeeStakeEntry'
import { useQuery } from '@apollo/client'

interface Fee {
  id: string
  value: bigint
  mathType: 'fixed' | 'percentage'
  allocations: bigint[]
}

export const useFeeStakeEntry = () => {
  const { data, loading } = useQuery<{ fee: Fee }>(queryFeeStakeEntry)

  return {
    fee: data?.fee,
    loading
  }
}
