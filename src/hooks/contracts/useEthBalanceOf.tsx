import { useCallback, useState } from 'react'
import { useBalance } from 'wagmi'

type UseEthBalanceOf = {
  walletAddress?: `0x${string}`
  chainId: number
}

export default function useEthBalanceOf({ walletAddress, chainId }: UseEthBalanceOf) {
  const [balance, setBalance] = useState<bigint>(0n)

  const { isFetching, refetch } = useBalance({
    address: walletAddress,
    chainId: chainId,
    enabled: !!walletAddress,
    onSuccess: data => {
      setBalance(data?.value || 0n)
    }
  })

  const handleRefetch = useCallback(() => {
    refetch()
  }, [refetch])

  return { balance, isLoading: isFetching, refetch: handleRefetch }
}
