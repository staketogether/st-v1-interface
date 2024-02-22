import { useCallback, useEffect, useState } from 'react'
import { useBalance } from 'wagmi'
import chainConfig from '../../config/chain'

export default function useEthBalanceOf(address?: `0x${string}`) {
  const { chainId } = chainConfig()
  const [balance, setBalance] = useState<bigint>(0n)

  const { data, isFetching, refetch } = useBalance({
    address,
    chainId
  })

  const ethBalance = data?.value || 0n

  const handleRefetch = useCallback(() => {
    refetch()
  }, [refetch])

  useEffect(() => {
    setBalance(ethBalance)
  }, [ethBalance])

  return { balance, isLoading: isFetching, refetch: handleRefetch }
}
