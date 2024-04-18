import { chainConfigByChainId } from '@/config/chain'
import { ProductStaking } from '@/types/ProductStaking'
import { useCallback, useEffect, useState } from 'react'
import { useBalance } from 'wagmi'

export const useWithdrawPoolBalance = ({ product, chainId }: { product: ProductStaking; chainId: number }) => {
  const { isTestnet } = chainConfigByChainId(chainId)
  const { StakeTogether } = product.contracts[isTestnet ? 'testnet' : 'mainnet']
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
