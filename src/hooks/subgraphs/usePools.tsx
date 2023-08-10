import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { queryPools } from '../../queries/subgraph/queryPools'

import { Pool } from '../../types/Pool'

export default function usePools() {
  const [pools, setPools] = useState<Pool[]>([])
  const [poolsIsLoading, setPoolsIsLoading] = useState<boolean>(false)

  const { data, loading } = useQuery<{ pools: Pool[] }>(queryPools)

  useEffect(() => {
    setPools(data?.pools || [])
  }, [data])

  useEffect(() => {
    setPoolsIsLoading(loading)
  }, [loading, setPoolsIsLoading])

  return { pools, poolsIsLoading }
}
