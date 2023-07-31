import chainConfig from '@/config/chain'
import { useEffect, useState } from 'react'
import { useBalance } from 'wagmi'

export const useWithdrawLiquidityLiquidity = () => {
  const { chainId, contracts } = chainConfig()
  const [liquidityBalance, setLiquidityBalance] = useState(0n)

  const { data, isFetching, refetch } = useBalance({
    address: contracts.Liquidity,
    chainId
  })

  useEffect(() => {
    if (data) {
      setLiquidityBalance(data.value)
    }
  }, [data])

  return {
    liquidityLiquidityBalance: liquidityBalance || 0n,
    isLoading: isFetching,
    refetch
  }
}
