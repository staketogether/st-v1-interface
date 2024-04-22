import { withdrawalsAbi } from '@/types/Contracts'
import { useEffect, useState } from 'react'
import { useReadContract } from 'wagmi'
import { getStakingById } from '@/config/product/staking'

export default function useWithdrawalsIsReady(amount = 0n) {
  const { Withdrawals } = getStakingById('eth-staking').contracts

  const [isReady, setIsReady] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const { isFetching, isSuccess, data } = useReadContract({
    address: Withdrawals,
    args: [amount],
    abi: withdrawalsAbi,
    functionName: 'isWithdrawReady'
  })

  useEffect(() => {
    if (isSuccess && data) {
      setIsReady(data)
    }
  }, [data, isSuccess])

  useEffect(() => {
    setLoading(isFetching)
  }, [isFetching])

  return { isReady, loading }
}
