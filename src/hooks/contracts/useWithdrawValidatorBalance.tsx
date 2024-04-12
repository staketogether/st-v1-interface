import { chainConfigByChainId } from '@/config/chain'
import { stakeTogetherAbi } from '@/types/Contracts'
import { ProductStaking } from '@/types/ProductStaking'
import { useEffect, useState } from 'react'
import { useReadContract } from 'wagmi'

export const useWithdrawValidatorBalance = ({
  product,
  chainId
}: {
  product: ProductStaking
  chainId: number
}) => {
  const [liquidityValidatorsBalance, setLiquidityValidatorsBalance] = useState(0n)
  const { isTestnet } = chainConfigByChainId(chainId)
  const { StakeTogether } = product.contracts[isTestnet ? 'testnet' : 'mainnet']

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
