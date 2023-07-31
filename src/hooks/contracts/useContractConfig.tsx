import { useEffect, useState } from 'react'
import { useStakeTogetherConfig } from '@/types/Contracts'
import chain from '@/config/chain'
import { ContactConfig } from '@/types/ContractConfig'

export default function useContractConfig() {
  const [loading, setLoading] = useState<boolean>(false)
  const [contractConfig, setContractConfig] = useState<ContactConfig | null>(null)
  const { contracts } = chain()

  const { data, isFetching } = useStakeTogetherConfig({
    address: contracts.StakeTogether
  })

  useEffect(() => {
    if (data) {
      const config: ContactConfig = {
        poolSize: data[0],
        minDepositAmount: data[1],
        minLockDays: data[2],
        maxLockDays: data[3],
        depositLimit: data[4],
        withdrawalLimit: data[5],
        blocksPerDay: data[6],
        maxDelegations: data[7],
        feature: data[8]
      }
      setContractConfig(config)
    }
  }, [data])

  useEffect(() => {
    setLoading(isFetching)
  }, [isFetching])

  return { contractConfig, loading }
}
