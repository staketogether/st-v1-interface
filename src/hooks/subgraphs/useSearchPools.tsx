import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { queryPools } from '../../queries/subgraph/queryPools'

import { ENSPool, PoolSubgraph } from '../../types/Pool'

export default function useSearchPools() {
  const [searchPools] = useState<ENSPool[]>([])
  const [searchLoading] = useState<boolean>(true)

  const { data } = useQuery<{ pools: PoolSubgraph[] }>(queryPools)

  useEffect(() => {
    // const getEnsPools = async () => {
    //   setSearchLoading(true)
    //   const addresses = data?.pools.map(pool => pool.address) || []
    //   const pools = await getSearchPools(addresses)
    //   setSearchPools(pools)
    //   setSearchLoading(false)
    // }
    // getEnsPools()
  }, [data])

  return { searchPools, searchLoading }
}
