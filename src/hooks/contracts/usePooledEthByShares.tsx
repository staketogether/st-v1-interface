import { BigNumber } from 'ethers'
import { useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { queryPooledEthByShares } from '@/queries/queryPooledEthByShares'
import { truncateEther } from '@/services/truncateEther'

interface PooledEthBySharesCalcInfoData {
  totalShares: BigNumber
  totalPooledEther: BigNumber
}

export default function usePooledEthByShares(sharesAmount: string) {

  const { data } = useQuery<{ stakeTogether: PooledEthBySharesCalcInfoData }>(queryPooledEthByShares, {
    nextFetchPolicy: 'cache-first'
  })

  const balance = useMemo(() => {
    if (!sharesAmount || !data?.stakeTogether) {
      return BigNumber.from('0')
    }

    const { totalPooledEther, totalShares } = data.stakeTogether

    const sharesAmountBN = BigNumber.from(sharesAmount)
    const totalSharesBN = BigNumber.from(totalShares)
    const totalPooledEtherBN = BigNumber.from(totalPooledEther)

    return sharesAmountBN.mul(totalPooledEtherBN).div(totalSharesBN)
  }, [data, sharesAmount])

  return balance
}
