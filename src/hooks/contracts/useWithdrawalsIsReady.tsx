import { getAssetContractsById } from '@/config/asset'
import { withdrawalsAbi } from '@/types/Contracts'
import { useEffect, useState } from 'react'
import { useReadContract } from 'wagmi'
import chainConfig from '../../config/chain'

export default function useWithdrawalsIsReady(amount = 0n) {
  const { isTestnet } = chainConfig()
  const { Withdrawals } = getAssetContractsById('eth-staking')

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
