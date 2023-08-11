import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'

import { queryStakeTogether } from '@/queries/subgraph/queryStakeTogether'
import { StakeTogether } from '@/types/StakeTogether'

export default function useStakeTogether() {
  const [stakeTogether, setStakeTogether] = useState<StakeTogether | undefined>(undefined)
  const [stakeTogetherIsLoading, setStakeTogetherIsLoading] = useState<boolean>(false)

  const { data, loading } = useQuery<{ stakeTogether: StakeTogether }>(queryStakeTogether)

  useEffect(() => {
    setStakeTogether(data?.stakeTogether)
  }, [data])

  useEffect(() => {
    setStakeTogetherIsLoading(loading)
  }, [loading, setStakeTogetherIsLoading])

  return { stakeTogether, stakeTogetherIsLoading }
}
