import { chainConfigByChainId } from '@/config/chain'
import { Product } from '@/types/Product'
import { useState } from 'react'
import { useBalance } from 'wagmi'

export const useWithdrawPoolBalance = ({ product, chainId }: { product: Product; chainId: number }) => {
  const { isTestnet } = chainConfigByChainId(chainId)
  const { StakeTogether } = product.contracts[isTestnet ? 'testnet' : 'mainnet']
  const [liquidityPoolBalance, setLiquidityPoolBalance] = useState(0n)

  const { isFetching, refetch } = useBalance({
    address: StakeTogether,
    chainId,
    onSuccess: data => {
      setLiquidityPoolBalance(data.value)
    }
  })

  return {
    withdrawPoolBalance: liquidityPoolBalance || 0n,
    isLoading: isFetching,
    refetch
  }
}
