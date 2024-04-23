import { stakeTogetherAbi } from '@/types/Contracts'
import { useEffect, useState } from 'react'
import { useReadContract } from 'wagmi'
import { STConfig } from '../../types/STConfig'
import { getStakingById } from '@/config/product/staking'
import { StakingId } from '@/types/Staking'

export default function useStConfig({ name }: { name: StakingId; chainId: number }) {
  const [stConfig, setSTConfig] = useState<STConfig | null>(null)

  const { StakeTogether } = getStakingById(name).contracts

  const { isFetching, isSuccess, data } = useReadContract({
    address: StakeTogether,
    abi: stakeTogetherAbi,
    functionName: 'config'
  })

  useEffect(() => {
    if (isSuccess && data) {
      const config: STConfig = {
        blocksPerDay: data[0],
        depositLimit: data[1],
        maxDelegations: data[2],
        minDepositAmount: data[3],
        minWithdrawAmount: data[4],
        poolSize: data[5],
        validatorSize: data[6],
        withdrawPoolLimit: data[7],
        withdrawalValidatorLimit: data[8],
        withdrawDelay: data[9],
        withdrawBeaconDelay: data[10],
        feature: data[11]
      }
      setSTConfig(config)
    }
  }, [data, isSuccess])

  return { stConfig, loading: isFetching }
}
