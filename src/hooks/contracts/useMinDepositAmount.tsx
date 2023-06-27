import chainConfig from '@/config/chain'

import { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'
import { stakeTogetherABI } from '../../types/Contracts'

export const useMinDepositAmount = () => {
  const [minDepositAmount, setMinDepositAmount] = useState<bigint>(0n)

  const { contracts } = chainConfig()

  const { data, isLoading } = useContractRead({
    address: contracts.StakeTogether,
    abi: stakeTogetherABI,
    functionName: 'minDepositAmount'
  })

  useEffect(() => {
    setMinDepositAmount(data || 0n)
  }, [data])

  return {
    minDepositAmount,
    isLoading
  }
}
