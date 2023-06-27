import chainConfig from '@/config/chain'

import { useEffect, useState } from 'react'
import { useStakeTogetherMinDepositAmount } from '../../types/Contracts'

export const useMinDepositAmount = () => {
  const [minDepositAmount, setMinDepositAmount] = useState<bigint>(0n)

  const { contracts } = chainConfig()

  const { data, isLoading } = useStakeTogetherMinDepositAmount({
    address: contracts.StakeTogether
  })

  useEffect(() => {
    setMinDepositAmount(data || 0n)
  }, [data])

  return {
    minDepositAmount,
    isLoading
  }
}
