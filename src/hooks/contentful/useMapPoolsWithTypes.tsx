import useContentfulPoolsList from '@/hooks/contentful/useContentfulPoolsList'
import { Pool, PoolWithType } from '@/types/Pool'

export function useMapPoolsWithTypes(pools: Pool[]) {
  const { poolsList } = useContentfulPoolsList()

  console.log(pools, poolsList)
  const poolsWithTypes: PoolWithType[] = pools.map(subgraphPool => {
    const pool = poolsList.find(
      item => item.wallet?.toLocaleLowerCase() === subgraphPool.id.toLocaleLowerCase()
    )

    if (!pool) {
      return { ...subgraphPool, type: undefined }
    }
    return { ...subgraphPool, type: pool.category?.name }
  })

  return poolsWithTypes
}
