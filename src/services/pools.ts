import { Pool, PoolWithType, PoolsType } from '@/types/Pool'

type PoolTypeMapping = {
  [address: string]: PoolsType
}

export function mapPoolsWithTypes(pools: Pool[]): PoolWithType[] {
  const poolTypeMapping: PoolTypeMapping = {
    '0xa092e75b355915a609bc4fc08417acc072c77215': PoolsType.art
  }

  const mappedPools = pools.map(pool => {
    const type = poolTypeMapping[pool.address]
    return { ...pool, type }
  })

  return mappedPools
}
