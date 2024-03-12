import { chainConfigByChainId } from '@/config/chain'
import { useCallback, useState } from 'react'
import { useBalance } from 'wagmi'

export default function useEthBalanceOf(address?: `0x${string}`) {
  const { chainId } = chainConfigByChainId(1)
  const [balance, setBalance] = useState<bigint>(0n)

  const { isFetching, refetch } = useBalance({
    address,
    chainId,
    onSuccess: data => {
      setBalance(data?.value || 0n)
    }
  })

  const handleRefetch = useCallback(() => {
    refetch()
  }, [refetch])

  return { balance, isLoading: isFetching, refetch: handleRefetch }
}
