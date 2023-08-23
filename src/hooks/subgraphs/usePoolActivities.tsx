import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { queryPoolActivities } from '@/queries/subgraph/queryPoolActivities'
import { ActivitiesPool } from '@/types/ActivitiesPool'

export default function usePoolActivities(
  poolAddress: `0x${string}`,
  pagination?: { first: number; skip: number }
) {
  const [poolActivities, setPoolActivities] = useState<ActivitiesPool[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loadingFetchMore, setLoadingFetchMore] = useState<boolean>(false)

  const { data, loading, fetchMore } = useQuery<{ poolActivities: ActivitiesPool[] }>(queryPoolActivities, {
    variables: { poolAddress: poolAddress, first: pagination?.first || 10, skip: pagination?.skip || 0 }
  })

  const loadMore = (variables: { id: string; first: number; skip: number }) => {
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
