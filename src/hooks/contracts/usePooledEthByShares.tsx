import { BigNumber } from 'ethers'
import chainConfig from '../../config/chain'
import { useStakeTogetherPooledEthByShares } from '../../types/Contracts'

export default function usePooledEthByShares(sharesAmount: BigNumber) {
  const { contracts } = chainConfig()

  const pooledEthBySharesReq = useStakeTogetherPooledEthByShares({
    address: contracts.StakeTogether,
    args: [sharesAmount]
  })

  return pooledEthBySharesReq.data?.toString() || '0'
}
