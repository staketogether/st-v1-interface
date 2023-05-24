/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { Delegation } from '../../types/Delegation'

export default function useSentDelegationsOf(address: `0x${string}`) {
  const [sentDelegations, setSentDelegations] = useState<Delegation[]>([])
  const [totalAmountSent, setTotalAmountSent] = useState<string>('0')
  const [totalDelegationsSent, setTotalDelegationsSent] = useState<string>('0')

  return { sentDelegations, totalAmountSent, totalDelegationsSent }
}
