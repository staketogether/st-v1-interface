import { BigNumber, ethers } from 'ethers'
import { useEffect } from 'react'
import { useWaitForTransaction } from 'wagmi'
import { apolloClient } from '../../config/apollo'
import chainConfig from '../../config/chain'
import { queryAccount } from '../../queries/queryAccount'
import { queryCommunity } from '../../queries/queryCommunity'
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
      gasLimit: BigNumber.from('200000')
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

  useEffect(() => {
    if (isSuccess) {
      apolloClient.query({
        query: queryAccount,
        variables: { id: accountAddress.toLowerCase() },
        fetchPolicy: 'network-only'
      })
      apolloClient.query({
        query: queryCommunity,
        variables: { id: communityAddress.toLowerCase() },
        fetchPolicy: 'network-only'
      })
    }
  }, [accountAddress, communityAddress, isSuccess])

  return { deposit, isLoading, isSuccess }
}
