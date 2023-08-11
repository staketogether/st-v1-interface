import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { queryPools } from '../../queries/subgraph/queryPools'

import getSearchPools from '../../services/getSearchPools'
import { ENSPool, PoolSubgraph } from '../../types/Pool'

export default function useSearchPools() {
  const [searchPools, setSearchPools] = useState<ENSPool[]>([])
  const [searchLoading, setSearchLoading] = useState<boolean>(true)

  const { data } = useQuery<{ pools: PoolSubgraph[] }>(queryPools)

  useEffect(() => {
    const getEnsPools = async () => {
      setSearchLoading(true)
      const addresses = data?.pools.map(pool => pool.address) || []
      const pools = await getSearchPools(addresses)
      setSearchPools(pools)
      setSearchLoading(false)
    }

    getEnsPools()
  }, [data])

  return { searchPools, searchLoading }
}
