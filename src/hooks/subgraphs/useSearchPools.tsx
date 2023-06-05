import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { queryPools } from '../../queries/queryPools'

import getSearchPools from '../../services/getSearchPools'
import { ENSPool, Pool } from '../../types/Pool'

export default function useSearchPools() {
  const [searchPools, setSearchPools] = useState<ENSPool[]>([])
  const [searchPoolsIsLoading, setSearchPoolsIsLoading] = useState<boolean>(false)

  const { data, loading } = useQuery<{ pools: Pool[] }>(queryPools)

  useEffect(() => {
    const getEnsPools = async () => {
      const addresses = data?.pools.map(pool => pool.address) || []
      const pools = await getSearchPools(addresses)
      setSearchPools(pools)
    }

    getEnsPools()
  }, [data])

  useEffect(() => {
    setSearchPoolsIsLoading(loading)
  }, [loading])

  return { searchPools, searchPoolsIsLoading }
}
