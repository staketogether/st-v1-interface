import { useEffect, useState } from 'react'
import { STConfig } from '../../types/STConfig'
import { getContractsByProductName } from '@/config/product'
import { StakingProduct } from '@/types/Product'
import { chainConfigByChainId } from '@/config/chain'
import { useReadContract } from 'wagmi'
import { stakeTogetherAbi } from '@/types/Contracts'

export default function useStConfig({
  productName,
  chainId
}: {
  productName: StakingProduct
  chainId: number
}) {
  const [stConfig, setSTConfig] = useState<STConfig | null>(null)
  const { isTestnet } = chainConfigByChainId(chainId)
  const { StakeTogether } = getContractsByProductName({ productName, isTestnet })

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
