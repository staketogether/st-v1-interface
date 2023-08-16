import { useEffect, useState } from 'react'
import chainConfig from '../../config/chain'
import { useStakeTogetherEstimateFeePercentage } from "@/types/Contracts";

interface FeeVaalyeByRole {
  Airdrop: { shares: bigint, amount: bigint }
  Operator: { shares: bigint, amount: bigint }
  StakeTogether: { shares: bigint, amount: bigint }
  Sender: { shares: bigint, amount: bigint }
}

enum FeeType {
  StakeEntry = 0,
  StakeRewards = 1,
  StakePool = 2,
  StakeValidator = 3,
}

export const useEstimaateFeePercentage = (feeType: FeeType, amount: bigint) => {
  const [feeByRole, setFeeByRole] = useState<FeeVaalyeByRole>({
    Airdrop: { shares: 0n, amount: 0n },
    Operator: { shares: 0n, amount: 0n },
    StakeTogether: { shares: 0n, amount: 0n },
    Sender: { shares: 0n, amount: 0n },
  })
  const { contracts } = chainConfig()
  const { StakeTogether } = contracts
  const { data, isFetching, refetch } = useStakeTogetherEstimateFeePercentage({
    address: StakeTogether,
    args: [feeType, amount],
    enabled: amount > 0n
  })

  useEffect(() => {
    if (data) {
      setFeeByRole({
        Airdrop: { shares: data[0][0], amount: data[1][0] },
        Operator: { shares: data[0][1], amount: data[1][1] },
        StakeTogether: { shares: data[0][2], amount: data[1][2] },
        Sender: { shares: data[0][3], amount: data[1][3] }
      })
    }
  }, [data])

  return { fees: feeByRole, isLoading: isFetching, refetch }
}
