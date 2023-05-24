/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'

export default function useReceivedDelegationsOf(
  communityAddress: `0x${string}`,
  accountAddress: `0x${string}`
) {
  const [totalAmountReceived, setTotalAmountReceived] = useState<string>('0')

  return { totalAmountReceived }
}
