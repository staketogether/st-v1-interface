import { chainConfigByChainId } from '@/config/chain'
import { stakeTogetherABI } from '@/types/Contracts'
import { Product } from '@/types/Product'
import { useEffect, useState } from 'react'
import { useReadContract } from 'wagmi'

export const useWithdrawValidatorBalance = ({ product, chainId }: { product: Product; chainId: number }) => {
  const [liquidityValidatorsBalance, setLiquidityValidatorsBalance] = useState(0n)
  const { isTestnet } = chainConfigByChainId(chainId)
  const { StakeTogether } = product.contracts[isTestnet ? 'testnet' : 'mainnet']

  const { isFetching, refetch, data, isSuccess } = useReadContract({
    address: StakeTogether,
    abi: stakeTogetherABI,
    functionName: 'beaconBalance'
  })

  useEffect(() => {
    if (isSuccess && data) {
      setLiquidityValidatorsBalance(data)
    }
  }, [data, isSuccess])

  return {
    withdrawValidatorsBalance: liquidityValidatorsBalance || 0n,
    isLoading: isFetching,
    refetch
  }
}
