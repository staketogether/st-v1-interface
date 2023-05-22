import { useEffect, useState } from 'react'
import chainConfig from '../config/chain'
import { useStakeTogetherIsCommunity } from '../types/Contracts'

export default function useCommunity(address: `0x${string}`) {
  const { contracts } = chainConfig()

  const [community, setCommunity] = useState<`0x${string}` | undefined>(undefined)
  const [communityIsLoading, setCommunityIsLoading] = useState<boolean>(false)
  const [communityIsSuccess, setCommunityIsSuccess] = useState<boolean>(false)

  const { data, isLoading, isSuccess } = useStakeTogetherIsCommunity({
    address: contracts.StakeTogether,
    args: [address]
  })

  useEffect(() => {
    setCommunity(data ? address : undefined)
  }, [address, data])

  useEffect(() => {
    setCommunityIsLoading(isLoading)
  }, [isLoading])

  useEffect(() => {
    setCommunityIsSuccess(isSuccess)
  }, [isSuccess])

  return { community, communityIsLoading, communityIsSuccess }
}
