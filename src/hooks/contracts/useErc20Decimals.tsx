import { useCallback, useEffect, useState } from 'react'
import { erc20Abi } from 'viem'
import { useReadContract } from 'wagmi'

type UseErc20BalanceOf = {
  token?: `0x${string}`
  chainId: number
}

export default function useErc20Decimals({ chainId, token }: UseErc20BalanceOf) {
  const [decimals, setDecimals] = useState<number>(0)

  const { isFetching, refetch, data } = useReadContract({
    address: token,
    chainId,
    functionName: 'decimals',
    abi: erc20Abi
  })
  const erc20Balance = data || 0

  useEffect(() => {
    setDecimals(erc20Balance)
  }, [erc20Balance])

  const handleRefetch = useCallback(() => {
    refetch()
  }, [refetch])

  return { decimals, isLoading: isFetching, refetch: handleRefetch }
}
