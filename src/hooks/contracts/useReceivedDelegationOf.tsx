import { useEffect, useState } from 'react'
import chainConfig from '../../config/chain'
import { useStakeTogetherGetDelegatesOf } from '../../types/Contracts'

export default function useReceivedDelegationsOf(
  communityAddress: `0x${string}`,
  accountAddress: `0x${string}`
) {
  const { contracts } = chainConfig()

  const [totalAmountReceived, setTotalAmountReceived] = useState<string>('0')

  const delegationsReceived = useStakeTogetherGetDelegatesOf({
    address: contracts.StakeTogether,
    args: [communityAddress],
    enabled: !!communityAddress,
    watch: true
  })

  useEffect(() => {
    if (delegationsReceived.data) {
      for (let i = 0; i < delegationsReceived.data[0].length; i++) {
        if (delegationsReceived.data[0][i] === accountAddress) {
          setTotalAmountReceived(delegationsReceived.data[1][i].toString())
        }
      }
    }
  }, [accountAddress, communityAddress, delegationsReceived.data])

  return { totalAmountReceived }
}
