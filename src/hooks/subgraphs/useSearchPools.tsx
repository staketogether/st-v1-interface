import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { queryPools } from '../../queries/queryPools'

import getSearchPools from '../../services/getSearchPools'
import { ENSPool, Pool } from '../../types/Pool'

export default function useSearchPools() {
  const [searchPools, setSearchPools] = useState<ENSPool[]>([])
  const [searchLoading, setSearchLoading] = useState<boolean>(true)

  const { data } = useQuery<{ pools: Pool[] }>(queryPools)

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
