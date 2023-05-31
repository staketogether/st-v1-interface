import { BigNumber, ethers } from 'ethers'
import { useWaitForTransaction } from 'wagmi'
import chainConfig from '../../config/chain'
import { usePrepareStakeTogetherDepositPool, useStakeTogetherDepositPool } from '../../types/Contracts'

export default function useDeposit(
  depositAmount: string,
  accountAddress: `0x${string}`,
  communityAddress: `0x${string}`
) {
  const { contracts } = chainConfig()

  const depositRule = ethers.BigNumber.isBigNumber(depositAmount) && BigNumber.from(depositAmount).gt(0)

  // Todo! Implement Referral
  const referral = '0x0000000000000000000000000000000000000000'

  const { config } = usePrepareStakeTogetherDepositPool({
    address: contracts.StakeTogether,
    args: [communityAddress, referral],
    overrides: {
      from: accountAddress,
      value: ethers.utils.parseEther(depositAmount),
      gasLimit: BigNumber.from('90000')
    },
    enabled: !depositRule
  })

  const tx = useStakeTogetherDepositPool(config)

  const deposit = () => {
    tx.write?.()
  }

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: tx.data?.hash
  })

  return { deposit, isLoading, isSuccess }
}
