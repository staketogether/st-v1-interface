import { BigNumber } from 'ethers'
import { useEffect, useState } from 'react'
import chainConfig from '../../config/chain'
import { useStakeTogetherGetDelegationsOf } from '../../types/Contracts'
import { Delegation } from '../../types/Delegation'

export default function useSentDelegationsOf(address: `0x${string}`) {
  const { contracts } = chainConfig()

  const [sentDelegations, setSentDelegations] = useState<Delegation[]>([])
  const [totalAmountSent, setTotalAmountSent] = useState<string>('0')
  const [totalDelegationsSent, setTotalDelegationsSent] = useState<string>('0')

  const delegationsSent = useStakeTogetherGetDelegationsOf({
    address: contracts.StakeTogether,
    args: [address],
    enabled: !!address,
    watch: true
  })

  useEffect(() => {
    const delegations: Delegation[] = []

    let totalAmount: BigNumber = BigNumber.from(0)
    let totalSent: BigNumber = BigNumber.from(0)

    if (delegationsSent.data) {
      for (let i = 0; i < delegationsSent.data[0].length; i++) {
        delegations.push({
          account: delegationsSent.data[0][i],
          amount: delegationsSent.data[1][i]
        })

        totalAmount = totalAmount.add(delegationsSent.data[1][i])
        totalSent = totalSent.add(1)
      }
    }

    setSentDelegations(delegations)
    setTotalAmountSent(totalAmount.toString())
    setTotalDelegationsSent(totalSent.toString())
  }, [delegationsSent.data, totalAmountSent, totalDelegationsSent])

  return { sentDelegations, totalAmountSent, totalDelegationsSent }
}
