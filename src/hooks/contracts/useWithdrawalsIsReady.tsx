import { useEffect, useState } from 'react'
import chainConfig from '../../config/chain'
import { useWithdrawalsIsWithdrawReady } from '@/types/Contracts'

export default function useWithdrawalsIsReady(amount: bigint = 0n) {
  const { contracts } = chainConfig()

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
