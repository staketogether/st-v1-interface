import { BigNumber, ethers } from 'ethers'
import { useWaitForTransaction } from 'wagmi'
import chainConfig from '../../config/chain'
import { usePrepareStakeTogetherUnstake, useStakeTogetherUnstake } from '../../types/Contracts'

export default function useUnstake(
  unstakeAmount: string,
  accountAddress: `0x${string}`,
  communityAddress: `0x${string}`
) {
  const { contracts } = chainConfig()

  const unstakeAmountRule =
    ethers.BigNumber.isBigNumber(unstakeAmount) && BigNumber.from(unstakeAmount).gt(0)

  const { config } = usePrepareStakeTogetherUnstake({
    address: contracts.StakeTogether,
    args: [ethers.utils.parseEther(unstakeAmount), communityAddress],
    overrides: {
      from: accountAddress
    },
    enabled: !unstakeAmountRule
  })

  const tx = useStakeTogetherUnstake(config)

  const unstake = () => {
    tx.write?.()
  }

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: tx.data?.hash
  })

  return { unstake, isLoading, isSuccess }
}
