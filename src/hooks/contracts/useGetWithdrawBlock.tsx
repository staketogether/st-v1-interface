import { useStakeTogetherGetWithdrawBlock } from '@/types/Contracts'
import { useEffect, useState } from 'react'
import useBlockCountdown from '../useBlockCountdown'
import { Product } from '@/types/Product'
import { chainConfigByChainId } from '@/config/chain'

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

  const { isFetching, refetch, data } = useStakeTogetherGetWithdrawBlock({
    address: StakeTogether,
    enabled: !!walletAddress && enabled,
    ...(walletAddress && { args: [walletAddress] }),
  })

  useEffect(() => {
    if (data) {
      setWithdrawBlock(data as bigint)
    }
  }, [data])

  const timeLeft = useBlockCountdown(Number(withdrawBlock), chainId) || 0

  return { withdrawBlock, isLoading: isFetching, timeLeft, getWithdrawBlock: refetch }
}
