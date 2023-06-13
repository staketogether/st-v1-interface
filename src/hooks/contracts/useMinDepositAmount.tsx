import { useStakeTogetherMinDepositAmount } from '@/types/Contracts'
import { useEffect, useState } from 'react'
import { BigNumber } from 'ethers'

export const useMinDepositAmount = () => {
  const [minDepositAmount, setMinDepositAmount] = useState<BigNumber>(BigNumber.from(0))
  const { data, isLoading } = useStakeTogetherMinDepositAmount()

  useEffect(() => {
    setMinDepositAmount(data || BigNumber.from(0))
  }, [data])

  return {
    minDepositAmount,
    isLoading
  }
}
