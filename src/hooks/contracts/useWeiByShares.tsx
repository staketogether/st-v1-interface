import { useEffect, useState } from 'react'
import chainConfig from '../../config/chain'
import { useStakeTogetherWeiByShares } from '@/types/Contracts'
import useActiveChain from "@/hooks/useActiveChain";

export default function useWeiByShares(sharesAmount?: string) {
  const { config: chain } = useActiveChain()
  const { contracts } = chain

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

  return { balance, loading }
}
