import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { queryPoolActivities } from '@/queries/subgraph/queryPoolActivities'
import { PoolActivity } from '@/types/PoolActivity'

export default function usePoolActivities(
  poolAddress: `0x${string}`,
  pagination?: { first: number; skip: number }
) {
  const [poolActivities, setPoolActivities] = useState<PoolActivity[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loadingFetchMore, setLoadingFetchMore] = useState<boolean>(false)

  const { data, loading, fetchMore } = useQuery<{ poolActivities: PoolActivity[] }>(queryPoolActivities, {
    variables: {
      poolAddress: poolAddress.toLocaleLowerCase(),
      first: pagination?.first || 10,
      skip: pagination?.skip || 0
    }
  })

  const loadMore = (variables: { poolAddress: string; first: number; skip: number }) => {
    setLoadingFetchMore(true)
    fetchMore({
      variables,
      updateQuery: (prev, { fetchMoreResult }) => {
        setLoadingFetchMore(false)
        if (!fetchMoreResult) return prev
        return {
          poolActivities: [...prev.poolActivities, ...fetchMoreResult.poolActivities]
        }
      }
    })
  }

  useEffect(() => {
    setPoolActivities(data?.poolActivities || [])
  }, [data])

  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

  return {
    poolActivities,
    initialLoading: isLoading,
    loadingFetchMore: loadingFetchMore || isLoading,
    loadMore
  }
}
