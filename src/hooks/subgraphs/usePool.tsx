import { useQuery } from '@apollo/client'
import { queryPool } from '../../queries/subgraph/queryPool'
import { PoolSubgraph } from '../../types/Pool'
import { useState } from 'react'

export default function usePool(address?: string, delegations?: { first: number; skip: number }) {
  const [loadingFetchMore, setLoadingFetchMore] = useState<boolean>(false)

  const {
    data,
    loading: poolLoading,
    fetchMore
  } = useQuery<{ pool: PoolSubgraph }>(queryPool, {
    variables: { id: address, first: delegations?.first || 10, skip: delegations?.skip || 0 },
    skip: !address?.length
  })

  const loadMore = (variables: { id: string; first: number; skip: number }) => {
    setLoadingFetchMore(true)
    fetchMore({
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
  }

  return {
    pool: data?.pool,
    loadMoreLoading: loadingFetchMore || poolLoading,
    initialLoading: poolLoading,
    fetchMore: loadMore
  }
}
