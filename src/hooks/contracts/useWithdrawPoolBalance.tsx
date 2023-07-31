import chainConfig from '@/config/chain'
import { useEffect, useState } from 'react'
import { useBalance } from 'wagmi'

export const useWithdrawPoolBalance = () => {
  const { chainId, contracts } = chainConfig()
  const [liquidityPoolBalance, setLiquidityPoolBalance] = useState(0n)

  const { data, isFetching, refetch } = useBalance({
    address: contracts.StakeTogether,
    chainId
  })

  useEffect(() => {
    if (data) {
      setLiquidityPoolBalance(data.value)
    }
  }, [data])

  //TODO RE-VISITAR ESSE HOOk
  return {
    withdrawPoolBalance: liquidityPoolBalance || 0n,
    isLoading: isFetching,
    refetch
  }
}
