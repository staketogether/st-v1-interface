import { BigNumber, ethers } from 'ethers'
import { useWaitForTransaction } from 'wagmi'
import chainConfig from '../../config/chain'
import { usePrepareStakeTogetherWithdrawPool, useStakeTogetherWithdrawPool } from '../../types/Contracts'

export default function useWithdraw(
  withdrawAmount: string,
  accountAddress: `0x${string}`,
  communityAddress: `0x${string}`
) {
  const { contracts } = chainConfig()

  const withdrawRule =
    ethers.BigNumber.isBigNumber(withdrawAmount) && BigNumber.from(withdrawAmount).gt(0)

  const { config } = usePrepareStakeTogetherWithdrawPool({
    address: contracts.StakeTogether,
    args: [ethers.utils.parseEther(withdrawAmount), communityAddress],
    overrides: {
      from: accountAddress
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

  return { withdraw, isLoading, isSuccess }
}
