import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { queryPool } from '../../queries/queryPool'
import { Pool } from '../../types/Pool'

export default function usePool(address: string) {
  const [pool, setPool] = useState<Pool | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)

  const { data, loading: poolLoading } = useQuery<{ pool: Pool }>(queryPool, {
    variables: { id: address }
  })

  useEffect(() => {
    setPool(data?.pool)
  }, [data])

  useEffect(() => {
    setLoading(poolLoading)
  }, [poolLoading, setLoading])

  return { pool, loading }
}
