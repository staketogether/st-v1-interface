import { useQuery } from '@apollo/client'
import { queryFeeStakeEntry } from '@/queries/subgraph/queryFeeStakeEntry'

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
