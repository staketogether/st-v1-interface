import chainConfig from '@/config/chain'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

export default function useEstimateGas(tx?: ethers.TransactionRequest) {
  const [estimateGas, setEstimateGas] = useState(0n)
  const { provider } = chainConfig()
  useEffect(() => {
    const estimateGas = async () => {
      const amountGat = await provider.estimateGas(tx as ethers.TransactionRequest)
      setEstimateGas(amountGat)
    }

    if (tx) {
      estimateGas()
    }
  }, [provider, tx])
  return { estimateGas }
}
