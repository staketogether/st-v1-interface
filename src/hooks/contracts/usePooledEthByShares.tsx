import { useEffect, useState } from 'react'
import chainConfig from '../../config/chain'
import { useStakeTogetherPooledEthByShares } from '../../types/Contracts'

export default function usePooledEthByShares(sharesAmount?: string) {
  const { contracts } = chainConfig()

  const [balance, setBalance] = useState<bigint>(0n)
  const [loading, setLoading] = useState<boolean>(false)

  const { isLoading } = useStakeTogetherPooledEthByShares({
    address: contracts.StakeTogether,
    args: [BigInt(sharesAmount || '0')],
    onSuccess: data => {
      setBalance(data || 0n)
    }
  })

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  return { balance, loading }
}
