import { useQuery } from '@apollo/client'
import { queryPool } from '../../queries/subgraph/queryPool'
import { PoolSubgraph } from '../../types/Pool'
import { useState } from 'react'

export default function usePool(address?: string, skip?: boolean) {
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
    skip: !address?.length || skip
  })

  const loadMore = async (variables: { id: string; first: number; skip: number }) => {
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
  }

  return {
    pool: data?.pool,
    loadMoreLoading: loadingFetchMore || poolLoading,
    initialLoading: poolLoading,
    fetchMore: loadMore
  }
}
