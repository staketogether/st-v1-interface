import { useEffect, useState } from 'react'
import chainConfig from '../../config/chain'
import { useStakeTogetherWeiByShares } from "@/types/Contracts";

export default function useWeiByShares(sharesAmount?: string) {
  const { contracts } = chainConfig()

  const [balance, setBalance] = useState<bigint>(0n)
  const [loading, setLoading] = useState<boolean>(false)

  const { isLoading } = useStakeTogetherWeiByShares({
    address: contracts.StakeTogether,
    args: [BigInt(sharesAmount || '0')],
    onSuccess: data => {
      setBalance(data || 0n)
    }
  })

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  return { shares: balance, loading }
}
