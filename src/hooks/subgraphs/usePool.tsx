import { useQuery } from '@apollo/client'
import { useCallback, useState } from 'react'
import { queryPool } from '../../queries/subgraph/queryPool'
import { PoolSubgraph } from '../../types/Pool'

export default function usePool(address?: string) {
  const [loadingFetchMore, setLoadingFetchMore] = useState<boolean>(false)

  const {
    data,
    loading: poolLoading,
    fetchMore
  } = useQuery<{ pool: PoolSubgraph }>(queryPool, {
    variables: {
      id: address?.toLocaleLowerCase(),
      first: 10,
      skip: 0
    },
    skip: !address?.length
  })

  const loadMore = useCallback(
    async (variables: { id: string; first: number; skip: number }) => {
      setLoadingFetchMore(true)
      await fetchMore({
        variables,
        updateQuery: (prev, { fetchMoreResult }) => {
          setLoadingFetchMore(false)

          if (!fetchMoreResult) return prev
          return {
            pool: {
              ...fetchMoreResult.pool,
              delegations: [...prev.pool.delegations, ...fetchMoreResult.pool.delegations]
            }
          }
        }
      })
    },
    [fetchMore]
  )

  return {
    pool: data?.pool,
    loadMoreLoading: loadingFetchMore || poolLoading,
    initialLoading: poolLoading,
    fetchMore: loadMore
  }
}
