import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { queryRewardsPool } from '@/queries/subgraph/queryRewardsPool'
import { PoolRewards } from '@/types/RewardsPool'

export default function usePoolRewards(
  poolAddress: `0x${string}`,
  pagination?: { first: number; skip: number }
) {
  const [rewardsPool, setRewardsPool] = useState<PoolRewards[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loadingFetchMore, setLoadingFetchMore] = useState<boolean>(false)

  const { data, loading, fetchMore } = useQuery<{ poolRewards: PoolRewards[] }>(queryRewardsPool, {
    variables: { poolId: poolAddress, first: pagination?.first || 10, skip: pagination?.skip || 0 }
  })
  const loadMore = (variables: { poolAddress: string; first: number; skip: number }) => {
    setLoadingFetchMore(true)
    fetchMore({
      variables,
      updateQuery: (prev, { fetchMoreResult }) => {
        setLoadingFetchMore(false)
        if (!fetchMoreResult) {
          return prev
        }

        return {
          poolRewards: [...prev.poolRewards, ...fetchMoreResult.poolRewards]
        }
      }
    })
  }

  useEffect(() => {
    setRewardsPool(data?.poolRewards || [])
  }, [data])

  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

  return {
    rewardsPool,
    initialLoading: isLoading,
    loadingFetchMore: loadingFetchMore || isLoading,
    loadMore
  }
}
