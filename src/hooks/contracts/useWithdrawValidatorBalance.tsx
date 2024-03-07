import chainConfig from '@/config/chain'
import { useStakeTogetherBeaconBalance } from '@/types/Contracts'
import { Product } from '@/types/Product'
import { useState } from 'react'

export const useWithdrawValidatorBalance = ({ product }: { product: Product }) => {
  const [liquidityValidatorsBalance, setLiquidityValidatorsBalance] = useState(0n)
  const { isTestnet } = chainConfig()
  const { StakeTogether } = product.contracts[isTestnet ? 'testnet' : 'mainnet']

  const { isFetching, refetch } = useStakeTogetherBeaconBalance({
    address: StakeTogether,
    onSuccess: data => {
      setLiquidityValidatorsBalance(data)
    }
  })

  //TODO RE-VISITAR ESSE HOOk
  return {
    withdrawValidatorsBalance: liquidityValidatorsBalance || 0n,
    isLoading: isFetching,
    refetch
  }
}
