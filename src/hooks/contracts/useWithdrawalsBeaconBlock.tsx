import { stakeTogetherAbi } from '@/types/Contracts'
import { useEffect, useState } from 'react'
import { useReadContract } from 'wagmi'
import useBlockCountdown from '../useBlockCountdown'
import { Staking } from '@/types/Staking'
import { chainConfigByChainId } from '@/config/chain'

interface useGetWithdrawBlockProps {
  walletAddress: `0x${string}` | undefined
  product: Staking
  chainId: number
}

export default function useWithdrawalsBeaconBlock({ walletAddress, product, chainId }: useGetWithdrawBlockProps) {
  const [withdrawBlock, setWithdrawBlock] = useState<bigint>(0n)
  const { StakeTogether } = product.contracts
  const config = chainConfigByChainId(chainId)

  const { isFetching, refetch, data } = useReadContract({
    query: {
      enabled: !!walletAddress
    },
    abi: stakeTogetherAbi,
    functionName: 'getWithdrawBeaconBlock',
    address: StakeTogether,
    ...(walletAddress && { args: [walletAddress] })
  })

  useEffect(() => {
    if (data) {
      setWithdrawBlock(data)
    }
  }, [data])

  const timeLeft = useBlockCountdown(Number(withdrawBlock), chainId, config.transactionConfig.blockTimePerSeconds) ?? 0

  return { withdrawBlock, isLoading: isFetching, timeLeft, getWithdrawBlock: refetch }
}
