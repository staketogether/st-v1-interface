import { useStakeTogetherWithdrawalsBalance } from '@/types/Contracts'
import { BigNumber } from 'ethers'
import chainConfig from '@/config/chain'

export const useWithdrawalLiquidityBalance = () => {
  const { contracts } = chainConfig()
  const { data, isLoading } = useStakeTogetherWithdrawalsBalance({
    address: contracts.StakeTogether
  })

  return {
    withdrawalLiquidityBalance: data || BigNumber.from(0),
    isLoading
  }
}
