import { useStakeTogetherSharesByPooledEth } from '@/types/Contracts'
import { useEffect, useState } from 'react'
import chainConfig from '../../config/chain'

/**
 * @deprecated Use from subgraph instead
 */
export default function useSharesByPooledEth(amount: bigint) {
  const { contracts } = chainConfig()

  const [balance, setBalance] = useState<bigint>(0n)
  const [loading, setLoading] = useState<boolean>(false)

  const { isLoading } = useStakeTogetherSharesByPooledEth({
    address: contracts.StakeTogether,
    args: [amount],
    onSuccess: data => {
      setBalance(data || 0n)
    }
  })

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  return { balance, loading }
}
