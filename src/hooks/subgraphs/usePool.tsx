import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { queryPool } from '../../queries/queryPool'
import { Pool } from '../../types/Pool'

export default function usePool(address?: string, delegations?: { first: number; skip: number }) {
  const [pool, setPool] = useState<Pool | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)

  const {
    data,
    loading: poolLoading,
    fetchMore
  } = useQuery<{ pool: Pool }>(queryPool, {
    variables: { id: address, first: delegations?.first || 10, skip: delegations?.skip || 0 },
    skip: !address?.length
  })

  const loadMore = (variables: { id: string; first: number; skip: number }) => {
    fetchMore({
      variables,
      updateQuery: (prev, { fetchMoreResult }) => {
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

  useEffect(() => {
    setPool(data?.pool)
  }, [data])

  useEffect(() => {
    setLoading(poolLoading)
  }, [poolLoading, setLoading])

  return { pool, loading, fetchMore: loadMore }
}
