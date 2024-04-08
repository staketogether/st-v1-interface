import { useEffect, useState } from 'react'
import useBlockCountdown from '../useBlockCountdown'
import { Product } from '@/types/Product'
import { chainConfigByChainId } from '@/config/chain'
import { stakeTogetherAbi } from '@/types/Contracts'
import { useReadContract } from 'wagmi'

type useGetWithdrawBlockProps = {
  walletAddress: `0x${string}` | undefined
  enabled: boolean
  product: Product
  chainId: number
}

export default function useGetWithdrawBlock({
  walletAddress,
  enabled = true,
  product,
  chainId
}: useGetWithdrawBlockProps) {
  const [withdrawBlock, setWithdrawBlock] = useState<bigint>(0n)
  const { isTestnet } = chainConfigByChainId(chainId)
  const { StakeTogether } = product.contracts[isTestnet ? 'testnet' : 'mainnet']

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
      setWithdrawBlock(data as bigint)
    }
  }, [data])

  const timeLeft =
    useBlockCountdown(Number(withdrawBlock), chainId, product.transactionConfig.blockTimePerSeconds) || 0

  return { withdrawBlock, isLoading: isFetching, timeLeft, getWithdrawBlock: refetch }
}
