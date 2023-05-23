import { useEffect, useState } from 'react'
import chainConfig from '../../config/chain'
import { useStakeTogetherGetTempUserRewards } from '../../types/Contracts'

export default function useAccountRewards(communityAddress: `0x${string}`) {
  const { contracts } = chainConfig()

  const [accountRewards, setAccountRewards] = useState<string>('0')

  const rewardsReceived = useStakeTogetherGetTempUserRewards({
    address: contracts.StakeTogether,
    args: [communityAddress],
    enabled: !!communityAddress,
    watch: true
  })

  useEffect(() => {
    if (rewardsReceived.data) {
      setAccountRewards(rewardsReceived.data.toString())
    }
  }, [rewardsReceived.data])

  return accountRewards
}
