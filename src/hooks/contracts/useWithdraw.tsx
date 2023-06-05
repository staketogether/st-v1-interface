import { BigNumber, ethers } from 'ethers'
import { useEffect } from 'react'
import { useWaitForTransaction } from 'wagmi'
import { apolloClient } from '../../config/apollo'
import chainConfig from '../../config/chain'
import { queryAccount } from '../../queries/queryAccount'
import { queryPool } from '../../queries/queryPool'
import { usePrepareStakeTogetherWithdrawPool, useStakeTogetherWithdrawPool } from '../../types/Contracts'

export default function useWithdraw(
  withdrawAmount: string,
  accountAddress: `0x${string}`,
  poolAddress: `0x${string}`
) {
  const { contracts } = chainConfig()

  const withdrawRule =
    ethers.BigNumber.isBigNumber(withdrawAmount) && BigNumber.from(withdrawAmount).gt(0)

  const { config } = usePrepareStakeTogetherWithdrawPool({
    address: contracts.StakeTogether,
    args: [ethers.utils.parseEther(withdrawAmount), poolAddress],
    overrides: {
      from: accountAddress,
      gasLimit: BigNumber.from('200000')
    },
    enabled: !withdrawRule
  })

  const tx = useStakeTogetherWithdrawPool(config)

  const withdraw = () => {
    tx.write?.()
  }

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: tx.data?.hash
  })

  useEffect(() => {
    if (isSuccess) {
      apolloClient.refetchQueries({
        include: [queryAccount, queryPool]
      })
    }
  }, [accountAddress, poolAddress, isSuccess])

  return { withdraw, isLoading, isSuccess }
}
