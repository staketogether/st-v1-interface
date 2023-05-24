import { BigNumber, ethers } from 'ethers'
import { useWaitForTransaction } from 'wagmi'
import chainConfig from '../../config/chain'
import { usePrepareStakeTogetherDeposit, useStakeTogetherDeposit } from '../../types/Contracts'

export default function useDeposit(
  depositAmount: string,
  accountAddress: `0x${string}`,
  communityAddress: `0x${string}`
) {
  const { contracts } = chainConfig()

  const depositRule = ethers.BigNumber.isBigNumber(depositAmount) && BigNumber.from(depositAmount).gt(0)

  // Todo! Implement Referral
  const referral = '0x0000000000000000000000000000000000000000'

  const { config } = usePrepareStakeTogetherDeposit({
    address: contracts.StakeTogether,
    args: [communityAddress, referral],
    overrides: {
      from: accountAddress,
      value: ethers.utils.parseEther(depositAmount)
    },
    enabled: !depositRule
  })

  const tx = useStakeTogetherDeposit(config)

  const deposit = () => {
    tx.write?.()
  }

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: tx.data?.hash
  })

  return { deposit, isLoading, isSuccess }
}
