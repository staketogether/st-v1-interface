import { useStakeTogetherConfig } from '@/types/Contracts'
import { useState } from 'react'
import { STConfig } from '../../types/STConfig'
import chainConfig from '@/config/chain'
import { getContractsByProductName } from '@/config/product'
import { StakingProduct } from '@/types/Product'

export default function useStConfig({ productName }: { productName: StakingProduct }) {
  const [stConfig, setSTConfig] = useState<STConfig | null>(null)
  const { isTestnet } = chainConfig()
  const { StakeTogether } = getContractsByProductName({ productName, isTestnet })

  const { isFetching } = useStakeTogetherConfig({
    address: StakeTogether,
    onSuccess(data) {
      if (data) {
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
    }
  })

  return { stConfig, loading: isFetching }
}
