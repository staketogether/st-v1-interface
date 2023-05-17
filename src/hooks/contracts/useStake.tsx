import { BigNumber, ethers } from 'ethers'
import { useWaitForTransaction } from 'wagmi'
import chainConfig from '../../config/chain'
import { usePrepareStakeTogetherStake, useStakeTogetherStake } from '../../types/Contracts'

export default function useStake(
  stakeAmount: string,
  accountAddress: `0x${string}`,
  communityAddress: `0x${string}`
) {
  const { contracts } = chainConfig()

  const stakeAmountRule = ethers.BigNumber.isBigNumber(stakeAmount) && BigNumber.from(stakeAmount).gt(0)

  const { config } = usePrepareStakeTogetherStake({
    address: contracts.StakeTogether,
    args: [communityAddress],
    overrides: {
      from: accountAddress,
      value: ethers.utils.parseEther(stakeAmount)
    },
    enabled: !stakeAmountRule
  })

  const tx = useStakeTogetherStake(config)

  const stake = () => {
    tx.write?.()
  }

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: tx.data?.hash
  })

  return { stake, isLoading, isSuccess }
}
