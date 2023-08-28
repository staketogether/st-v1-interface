import useContentfulPoolsList from '@/hooks/contentful/useContentfulPoolsList'
import { Pool, PoolSubgraph } from '@/types/Pool'

export function useMapPoolsWithTypes(pools: PoolSubgraph[]) {
  const { poolsList } = useContentfulPoolsList()

  const poolsWithTypes: Pool[] = pools.map(subgraphPool => {
    const pool = poolsList.find(
      item => item.wallet?.toLocaleLowerCase() === subgraphPool.id.toLocaleLowerCase()
    )

    if (!pool) {
      return { ...subgraphPool, type: '', name: '', logo: { url: '', fileName: '' } }
    }
    return { ...subgraphPool, type: pool.category?.name, name: pool.name, logo: pool.logo }
  })

  return poolsWithTypes
}
