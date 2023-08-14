import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { queryPoolActivities } from '@/queries/queryPoolActivities'
import { ActivitiesPool } from '@/types/ActivitiesPool'

export default function usePoolActivities(poolAddress: `0x${string}`) {
  const [poolActivities, setPoolActivities] = useState<ActivitiesPool[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { data, loading } = useQuery<{ poolActivities: ActivitiesPool[] }>(queryPoolActivities, {
    variables: { poolAddress: poolAddress }
  })

  useEffect(() => {
    setPoolActivities(data?.poolActivities || [])
  }, [data])

  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

  return { poolActivities, isLoading }
}
