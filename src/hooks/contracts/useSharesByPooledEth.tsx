import { useEffect, useState } from 'react'
import chainConfig from '../../config/chain'
import { useStakeTogetherGetSharesByPooledEth } from '../../types/Contracts'

export default function useSharesByPooledEth(ethAmount: bigint) {
  const { contracts } = chainConfig()

  const [balance, setBalance] = useState<bigint>(0n)
  const [loading, setLoading] = useState<boolean>(false)

  const { isLoading } = useStakeTogetherGetSharesByPooledEth({
    address: contracts.StakeTogether,
    args: [ethAmount],
    onSuccess: data => {
      setBalance(data || 0n)
    }
  })

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  return { balance, loading }
}
