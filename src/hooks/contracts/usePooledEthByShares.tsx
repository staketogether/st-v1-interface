import { useEffect, useState } from 'react'
import chainConfig from '../../config/chain'
import { useStakeTogetherPooledEthByShares } from '../../types/Contracts'

export default function usePooledEthByShares(sharesAmount: string) {
  const { contracts } = chainConfig()

  const [balance, setBalance] = useState<bigint>(0n)

  const { data, isLoading } = useStakeTogetherPooledEthByShares({
    address: contracts.StakeTogether,
    args: [BigInt(sharesAmount)]
  })

  useEffect(() => {
    setBalance(data || 0n)
  }, [data])

  return { balance, loading: isLoading }
}
