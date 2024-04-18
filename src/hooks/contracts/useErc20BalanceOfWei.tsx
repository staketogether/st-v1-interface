import { useEffect, useState } from 'react'
import useErc20BalanceOf from './useErc20BalanceOf'
import useErc20Decimals from './useErc20Decimals'

interface UseErc20BalanceOfWei {
  walletAddress?: `0x${string}`
  token?: `0x${string}`
  chainId: number
}

export default function useErc20BalanceOfWei({ walletAddress, chainId, token }: UseErc20BalanceOfWei) {
  const [balanceInWei, setBalanceInWei] = useState<bigint>(0n)
  const { balance, isLoading: isBalanceLoading, refetch: refetchBalance } = useErc20BalanceOf({ walletAddress, chainId, token })
  const { decimals, isLoading: isDecimalsLoading, refetch: refetchDecimals } = useErc20Decimals({ chainId, token })

  useEffect(() => {
    if (!isBalanceLoading && !isDecimalsLoading) {
      const ethDecimals = 18n

      if (ethDecimals - BigInt(decimals) <= 0n) {
        setBalanceInWei(balance)
        return
      }

      setBalanceInWei(balance * 10n ** (ethDecimals - BigInt(decimals)))
    }
  }, [balance, decimals, isBalanceLoading, isDecimalsLoading])

  const isLoading = isBalanceLoading || isDecimalsLoading
  const refetch = () => {
    refetchBalance()
    refetchDecimals()
  }

  return { balanceInWei, isLoading, refetch }
}
