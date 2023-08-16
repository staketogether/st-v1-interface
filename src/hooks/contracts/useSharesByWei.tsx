import { useEffect, useState } from 'react'
import chainConfig from '../../config/chain'
import { useStakeTogetherSharesByWei } from "@/types/Contracts";

/**
 * @deprecated Use from subgraph instead
 */
export default function useSharesByWei(amount: bigint) {
  const { contracts } = chainConfig()

  const [shares, setShares] = useState<bigint>(0n)
  const [loading, setLoading] = useState<boolean>(false)

  const { isLoading } = useStakeTogetherSharesByWei({
    address: contracts.StakeTogether,
    args: [amount],
    onSuccess: data => {
      setShares(data || 0n)
    }
  })

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  return { shares, loading }
}
