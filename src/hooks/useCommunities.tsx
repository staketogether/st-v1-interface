import { useEffect, useState } from 'react'
import chainConfig from '../config/chain'
import { useStakeTogetherGetCommunities } from '../types/Contracts'

export default function useCommunities() {
  const { contracts } = chainConfig()

  const [communities, setCommunities] = useState<`0x${string}`[]>([])
  const [communitiesIsLoading, setCommunitiesIsLoading] = useState<boolean>(false)
  const [communitiesIsSuccess, setCommunitiesIsSuccess] = useState<boolean>(false)

  const { data, isLoading, isSuccess } = useStakeTogetherGetCommunities<`0x${string}`[]>({
    address: contracts.StakeTogether
  })

  useEffect(() => {
    setCommunities(data || [])
  }, [data])

  useEffect(() => {
    setCommunitiesIsLoading(isLoading)
  }, [isLoading])

  useEffect(() => {
    setCommunitiesIsSuccess(isSuccess)
  }, [isSuccess])

  return { communities, communitiesIsLoading, communitiesIsSuccess }
}
