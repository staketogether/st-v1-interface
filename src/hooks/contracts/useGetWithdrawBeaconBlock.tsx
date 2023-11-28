import { useStakeTogetherGetWithdrawBeaconBlock } from '@/types/Contracts'
import { useEffect, useState } from 'react'
import chain from '@/config/chain'
import useBlockCountdown from '../useBlockCountdown'

export default function useGetWithdrawBeaconBlock(walletAddress: `0x${string}` | undefined) {
  const [withdrawBlock, setWithdrawBlock] = useState<bigint>(0n)
  const { contracts } = chain()
  const { data, isFetching } = useStakeTogetherGetWithdrawBeaconBlock({
    address: contracts.StakeTogether,
    enabled: !!walletAddress,
    ...(walletAddress && { args: [walletAddress] })
  })
  useEffect(() => {
    if (data) {
      setWithdrawBlock(data)
    }
  }, [data])

  const timeLeft = useBlockCountdown(Number(withdrawBlock)) || 0

  return { withdrawBlock, isLoading: isFetching, timeLeft }
}
