import { useCallback, useEffect, useState } from 'react'
import { useBalance } from 'wagmi'
import { Asset } from '@/types/Asset'

export const useWithdrawPoolBalance = ({ product, chainId }: { product: Asset; chainId: number }) => {
  const StakeTogether = product.staking?.contracts.StakeTogether ?? '' as `0x${string}`
  const [liquidityPoolBalance, setLiquidityPoolBalance] = useState(0n)

  const { isFetching, refetch, data } = useBalance({
    address: StakeTogether,
    chainId
  })

  const ethBalance = data?.value ?? 0n

  useEffect(() => {
    setLiquidityPoolBalance(ethBalance)
  }, [ethBalance])

  const handleRefetch = useCallback(() => {
    refetch()
  }, [refetch])

  return {
    withdrawPoolBalance: liquidityPoolBalance || 0n,
    isLoading: isFetching,
    refetch: handleRefetch
  }
}
