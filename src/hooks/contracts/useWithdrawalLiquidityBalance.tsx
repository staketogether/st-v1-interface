import chainConfig from '@/config/chain'

import { useContractRead } from 'wagmi'
import { stakeTogetherABI } from '../../types/Contracts'

export const useWithdrawalLiquidityBalance = () => {
  const { contracts } = chainConfig()

  const { data, isLoading } = useContractRead({
    address: contracts.StakeTogether,
    abi: stakeTogetherABI,
    functionName: 'withdrawalsBalance'
  })

  return {
    withdrawalLiquidityBalance: data || 0n,
    isLoading
  }
}
