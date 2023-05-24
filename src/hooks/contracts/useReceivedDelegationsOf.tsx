/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'

import { DelegationOld } from '../../types/Delegation'

export default function useReceivedDelegationsOf(address: `0x${string}`) {
  const [receivedDelegations, setReceivedDelegations] = useState<DelegationOld[]>([])
  const [totalAmountReceived, setTotalAmountReceived] = useState<string>('0')
  const [totalDelegationsReceived, setTotalDelegationsReceived] = useState<string>('0')

  return { receivedDelegations, totalAmountReceived, totalDelegationsReceived }
}
