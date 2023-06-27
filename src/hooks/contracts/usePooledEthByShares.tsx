import { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'
import chainConfig from '../../config/chain'
import { stakeTogetherABI } from '../../types/Contracts'

export default function usePooledEthByShares(sharesAmount: bigint) {
  const { contracts } = chainConfig()

  const [balance, setBalance] = useState<bigint>(0n)

  const { data, isLoading } = useContractRead({
    address: contracts.StakeTogether,
    abi: stakeTogetherABI,
    functionName: 'pooledEthByShares',
    args: [sharesAmount]
  })

  useEffect(() => {
    setBalance(data || 0n)
  }, [data])

  return { balance, loading: isLoading }
}
