import chainConfig from '@/config/chain'

import { useStakeTogetherWithdrawalsBalance } from '../../types/Contracts'

export const useWithdrawalLiquidityBalance = () => {
  const { contracts } = chainConfig()

  const { data, isLoading } = useStakeTogetherWithdrawalsBalance({
    address: contracts.StakeTogether
  })

  return {
    withdrawalLiquidityBalance: data || 0n,
    isLoading
  }
}
