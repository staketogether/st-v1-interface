import { useEffect, useState } from 'react'
import { useStakeTogetherConfig } from '@/types/Contracts'
import chain from '@/config/chain'

export default function useContractConfig() {
  const [loading, setLoading] = useState<boolean>(false)
  const { contracts } = chain()

  const { data, isFetching } = useStakeTogetherConfig({
    address: contracts.StakeTogether
  })

  useEffect(() => {
    setLoading(isFetching)
  }, [isFetching])

  return { loading }
}
