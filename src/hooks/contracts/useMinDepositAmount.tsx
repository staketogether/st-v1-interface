import { useStakeTogetherMinDepositAmount } from '@/types/Contracts'
import { useEffect, useState } from 'react'
import { BigNumber } from 'ethers'
import chainConfig from '@/config/chain'

export const useMinDepositAmount = () => {
  const [minDepositAmount, setMinDepositAmount] = useState<BigNumber>(BigNumber.from(0))

  const { contracts } = chainConfig()
  const { data, isLoading } = useStakeTogetherMinDepositAmount({
    address: contracts.StakeTogether
  })

  useEffect(() => {
    setMinDepositAmount(data || BigNumber.from(0))
  }, [data])

  return {
    minDepositAmount,
    isLoading
  }
}
