import { stakeTogetherAbi } from '@/types/Contracts'
import { useEffect, useState } from 'react'
import { useReadContract } from 'wagmi'
import { Staking } from '@/types/Staking'

export const useWithdrawValidatorBalance = ({ product }: { product: Staking; chainId: number }) => {
  const [liquidityValidatorsBalance, setLiquidityValidatorsBalance] = useState(0n)
  const { StakeTogether } = product.contracts

  const { isFetching, refetch, data, isSuccess } = useReadContract({
    address: StakeTogether,
    abi: stakeTogetherAbi,
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
