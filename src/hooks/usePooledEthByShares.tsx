import { BigNumber } from 'ethers'
import { useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import { queryPooledEthByShares } from '@/queries/queryPooledEthByShares'

interface PooledEthBySharesCalcInfoData {
  totalShares: BigNumber
  totalPooledEther: BigNumber
}

export default function usePooledEthByShares(sharesAmount?: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { data, loading: queryLoading } = useQuery<{ stakeTogether: PooledEthBySharesCalcInfoData }>(
    queryPooledEthByShares,
    {
      nextFetchPolicy: 'cache-first'
    }
  )

  const balance = useMemo(() => {
    setIsLoading(true)
    if (!sharesAmount || !data?.stakeTogether) {
      setIsLoading(false)
      return BigNumber.from('0')
    }

    const { totalPooledEther, totalShares } = data.stakeTogether

    const sharesAmountBN = BigNumber.from(sharesAmount)
    const totalSharesBN = BigNumber.from(totalShares)
    const totalPooledEtherBN = BigNumber.from(totalPooledEther)
    setIsLoading(false)

    return sharesAmountBN.mul(totalPooledEtherBN).div(totalSharesBN)
  }, [data, sharesAmount])

  return { balance, loading: isLoading || queryLoading }
}
