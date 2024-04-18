import { chainConfigByChainId } from '@/config/chain'
import { stakeTogetherAbi } from '@/types/Contracts'
import { useEffect, useState } from 'react'
import { useReadContract } from 'wagmi'
import useBlockCountdown from '../useBlockCountdown'
import { Product } from '@/types/Product'

type useGetWithdrawBlockProps = {
  walletAddress: `0x${string}` | undefined
  product: Product
  chainId: number
}

export default function useWithdrawalsBeaconBlock({
  walletAddress,
  product,
  chainId
}: useGetWithdrawBlockProps) {
  const [withdrawBlock, setWithdrawBlock] = useState<bigint>(0n)
  const { isTestnet } = chainConfigByChainId(chainId)
  const { StakeTogether } = product.contracts[isTestnet ? 'testnet' : 'mainnet']

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
      setWithdrawBlock(data as bigint)
    }
  }, [data])

  const timeLeft =
    useBlockCountdown(Number(withdrawBlock), chainId, product.transactionConfig.blockTimePerSeconds) || 0

  return { withdrawBlock, isLoading: isFetching, timeLeft, getWithdrawBlock: refetch }
}
