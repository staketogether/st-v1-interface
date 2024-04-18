import { useCallback, useEffect, useState } from 'react'
import { useReadContract } from 'wagmi'
import { erc20Abi } from 'viem'

type UseErc20BalanceOf = {
  walletAddress?: `0x${string}`
  token?: `0x${string}`
  chainId: number
}

export default function useErc20BalanceOf({ walletAddress, chainId, token }: UseErc20BalanceOf) {
  const [balance, setBalance] = useState<bigint>(0n)

  const { isFetching, refetch, data } = useReadContract({
    address: token,
    chainId,
    functionName: 'balanceOf',
    abi: erc20Abi,
    args: walletAddress ? [walletAddress] : undefined
  })
  const erc20Balance = data || 0n

  useEffect(() => {
    setBalance(erc20Balance)
  }, [erc20Balance])

  const handleRefetch = useCallback(() => {
    refetch()
  }, [refetch])

  return { balance, isLoading: isFetching, refetch: handleRefetch }
}
