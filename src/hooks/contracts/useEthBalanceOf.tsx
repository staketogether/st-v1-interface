import { useCallback, useEffect, useState } from 'react'
import { useBalance } from 'wagmi'

type UseEthBalanceOf = {
  walletAddress?: `0x${string}`
  chainId: number
}

export default function useEthBalanceOf({ walletAddress, chainId }: UseEthBalanceOf) {
  const [balance, setBalance] = useState<bigint>(0n)

  const { isFetching, refetch, data } = useBalance({
    address: walletAddress,
    chainId: chainId,
    query: {
      enabled: !!walletAddress
    }
  })

  const ethBalance = data?.value || 0n

  useEffect(() => {
    setBalance(ethBalance)
  }, [ethBalance])

  const handleRefetch = useCallback(() => {
    refetch()
  }, [refetch])

  return { balance, isLoading: isFetching, refetch: handleRefetch }
}
