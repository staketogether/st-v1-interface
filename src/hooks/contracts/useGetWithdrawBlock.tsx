import { chainConfigByChainId } from '@/config/chain'
import { stakeTogetherAbi } from '@/types/Contracts'
import { useEffect, useState } from 'react'
import { useReadContract } from 'wagmi'
import useBlockCountdown from '../useBlockCountdown'
import { Staking } from '@/types/Staking'

interface useGetWithdrawBlockProps {
  walletAddress: `0x${string}` | undefined
  enabled: boolean
  product: Staking
  chainId: number
}

export default function useGetWithdrawBlock({ walletAddress, enabled = true, product, chainId }: useGetWithdrawBlockProps) {
  const [withdrawBlock, setWithdrawBlock] = useState<bigint>(0n)
  const { StakeTogether } = product.contracts
  const {transactionConfig} = chainConfigByChainId(chainId)

  const { isFetching, refetch, data } = useReadContract({
    query: {
      enabled: !!walletAddress && enabled
    },
    abi: stakeTogetherAbi,
    functionName: 'getWithdrawBlock',
    address: StakeTogether,
    ...(walletAddress && { args: [walletAddress] })
  })

  useEffect(() => {
    if (data) {
      setWithdrawBlock(data)
    }
  }, [data])

  const timeLeft = useBlockCountdown(Number(withdrawBlock), chainId, transactionConfig.blockTimePerSeconds) ?? 0

  return { withdrawBlock, isLoading: isFetching, timeLeft, getWithdrawBlock: refetch }
}
