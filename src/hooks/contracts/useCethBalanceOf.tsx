import { useEffect, useState } from 'react'
import chainConfig from '../../config/chain'
import { useStakeTogetherBalanceOf } from '../../types/Contracts'

export default function useCethBalanceOf(address: `0x${string}`) {
  const { contracts } = chainConfig()

  const [cethBalance, setCethBalance] = useState<string>('0')

  const cethReq = useStakeTogetherBalanceOf({
    address: contracts.StakeTogether,
    args: [address],
    enabled: !!address,
    watch: true
  })

  useEffect(() => {
    setCethBalance(cethReq.data?.toString() || '0')
  }, [cethBalance, cethReq.data])

  return { cethBalance, isLoading: cethReq.isLoading }
}
