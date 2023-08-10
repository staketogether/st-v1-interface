import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { queryPools } from '../../queries/queryPools'

import { PoolSubgraph } from '../../types/Pool'

export default function usePools() {
  const [pools, setPools] = useState<PoolSubgraph[]>([])
  const [poolsIsLoading, setPoolsIsLoading] = useState<boolean>(false)

  const { data, loading } = useQuery<{ pools: PoolSubgraph[] }>(queryPools)

  useEffect(() => {
    setPools(data?.pools || [])
  }, [data])

  useEffect(() => {
    setPoolsIsLoading(loading)
  }, [loading, setPoolsIsLoading])

  return { pools, poolsIsLoading }
}
