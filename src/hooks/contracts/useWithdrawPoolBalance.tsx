import { useCallback, useEffect, useState } from 'react'
import { useBalance } from 'wagmi'
import { Staking } from '@/types/Staking'

export const useWithdrawPoolBalance = ({ product, chainId }: { product: Staking; chainId: number }) => {
  const StakeTogether = product.contracts.StakeTogether
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
