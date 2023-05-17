import { BigNumber } from 'ethers'
import { useEffect, useState } from 'react'
import chainConfig from '../../config/chain'

import { useStakeTogetherGetDelegatesOf } from '../../types/Contracts'
import { Delegation } from '../../types/Delegation'

export default function useReceivedDelegationsOf(address: `0x${string}`) {
  const { contracts } = chainConfig()

  const [receivedDelegations, setReceivedDelegations] = useState<Delegation[]>([])
  const [totalAmountReceived, setTotalAmountReceived] = useState<string>('0')
  const [totalDelegationsReceived, setTotalDelegationsReceived] = useState<string>('0')

  const delegationsReceived = useStakeTogetherGetDelegatesOf({
    address: contracts.StakeTogether,
    args: [address],
    enabled: !!address,
    watch: true
  })

  useEffect(() => {
    const delegations: Delegation[] = []

    let totalAmount: BigNumber = BigNumber.from(0)
    let totalDelegations: BigNumber = BigNumber.from(0)

    if (delegationsReceived.data) {
      for (let i = 0; i < delegationsReceived.data[0].length; i++) {
        delegations.push({
          account: delegationsReceived.data[0][i],
          amount: delegationsReceived.data[1][i]
        })

        totalAmount = totalAmount.add(delegationsReceived.data[1][i])
        totalDelegations = totalDelegations.add(1)
      }
    }

    setReceivedDelegations(delegations)
    setTotalAmountReceived(totalAmount.toString())
    setTotalDelegationsReceived(totalDelegations.toString())
  }, [delegationsReceived.data])

  return { receivedDelegations, totalAmountReceived, totalDelegationsReceived }
}
