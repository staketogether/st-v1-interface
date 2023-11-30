import { useEffect, useState } from 'react'
import chainConfig from '../../config/chain'
import { useWithdrawalsIsWithdrawReady } from '@/types/Contracts'
import useActiveChain from "@/hooks/useActiveChain";

export default function useWithdrawalsIsReady(amount: bigint = 0n) {
  const { config: chain } = useActiveChain()
  const { contracts } = chain

  const [isReady, setIsReady] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const { isLoading } = useWithdrawalsIsWithdrawReady({
    address: contracts.Withdrawals,
    args: [amount],
    onSuccess: data => {
      setIsReady(data)
    }
  })

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  return { isReady, loading }
}
