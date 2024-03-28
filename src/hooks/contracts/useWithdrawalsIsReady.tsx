import { useEffect, useState } from 'react'
import chainConfig from '../../config/chain'
import { withdrawalsAbi } from '@/types/Contracts'
import { getContractsByProductName } from '@/config/product'
import { useReadContract } from 'wagmi'

export default function useWithdrawalsIsReady(amount: bigint = 0n) {
  const { isTestnet } = chainConfig()

  const { Withdrawals } = getContractsByProductName({
    productName: 'ethereum-stake',
    isTestnet
  })

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
