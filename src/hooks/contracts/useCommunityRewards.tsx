import { useEffect, useState } from 'react'
import chainConfig from '../../config/chain'
import { useStakeTogetherGetTempCommunitySharesRewards } from '../../types/Contracts'

export default function useCommunityRewards(communityAddress: `0x${string}`) {
  const { contracts } = chainConfig()

  const [communityRewards, setCommunityRewards] = useState<string>('0')

  const rewardsReceived = useStakeTogetherGetTempCommunitySharesRewards({
    address: contracts.StakeTogether,
    args: [communityAddress],
    enabled: !!communityAddress,
    watch: true
  })

  useEffect(() => {
    if (rewardsReceived.data) {
      setCommunityRewards(rewardsReceived.data.toString())
    }
  }, [rewardsReceived.data])

  return communityRewards
}
