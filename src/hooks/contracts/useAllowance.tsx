import { useCallback } from 'react'
import { erc20Abi } from 'viem'
import { useReadContract } from 'wagmi'

interface useAllowanceProps {
  userAccountAddress: `0x${string}`
  contractAddress?: `0x${string}`
  spenderAddress: `0x${string}`
  chainId: number
}

export default function useAllowance({ contractAddress, userAccountAddress, spenderAddress, chainId }: useAllowanceProps) {
  const {
    data: allowanceData,
    isFetching: allowanceDataFetching,
    isLoading: allowanceDataLoading,
    refetch: allowanceDataRefetch
  } = useReadContract({
    abi: erc20Abi,
    address: contractAddress,
    chainId: chainId,
    functionName: 'allowance',
    args: [userAccountAddress, spenderAddress]
  })

  const handleRefetch = useCallback(() => {
    allowanceDataRefetch()
  }, [allowanceDataRefetch])

  return { isLoading: allowanceDataFetching || allowanceDataLoading, allowanceData, refetch: handleRefetch }
}
