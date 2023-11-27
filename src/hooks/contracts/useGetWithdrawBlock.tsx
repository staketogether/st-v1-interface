import chain from '@/config/chain'
import { useStakeTogetherGetWithdrawBlock } from '@/types/Contracts'
import { useEffect, useState } from 'react'
import useBlockCountdown from '../useBlockCountdown'

export default function useGetWithdrawBlock(walletAddress: `0x${string}`) {
  const [withdrawBlock, setWithdrawBlock] = useState<bigint>(0n)
  const { contracts } = chain()
  const { data, isFetching } = useStakeTogetherGetWithdrawBlock({
    address: contracts.StakeTogether,
    args: [walletAddress]
  })
  const timeLeft = useBlockCountdown(Number(withdrawBlock))
  useEffect(() => {
    if (data) {
      setWithdrawBlock(data)
    }
  }, [data])
  return { withdrawBlock, isLoading: isFetching, timeLeft }
}
