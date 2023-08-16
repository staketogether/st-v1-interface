import chain from '@/config/chain'

import { useStakeTogetherConfig } from '@/types/Contracts'
import { useEffect, useState } from 'react'
import { STConfig } from '../../types/STConfig'

export default function useStConfig() {
  const [loading, setLoading] = useState<boolean>(false)
  const [stConfig, setSTConfig] = useState<STConfig | null>(null)
  const { contracts } = chain()

  const { data, isFetching } = useStakeTogetherConfig({
    address: contracts.StakeTogether
  })

  useEffect(() => {
    if (data) {
      const config: STConfig = {
        blocksPerDay: data[0],
        depositLimit: data[1],
        maxDelegations: data[2],
        minDepositAmount: data[3],
        minWithdrawAmount: data[4],
        poolSize: data[5],
        validatorSize: data[6],
        withdrawalLimit: data[7],
        feature: data[8]
      }
      setSTConfig(config)
    }
  }, [data])

  useEffect(() => {
    setLoading(isFetching)
  }, [isFetching])

  return { stConfig, loading }
}
