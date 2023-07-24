import chainConfig from '@/config/chain'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

export default function useEstimateGas(tx?: ethers.TransactionRequest) {
  const [estimateGas, setEstimateGas] = useState(0n)
  const { provider } = chainConfig()
  useEffect(() => {
    const estimateGas = async () => {
      const gasEstimate = await provider.estimateGas(tx as ethers.TransactionRequest)
      const gasLimit = gasEstimate + gasEstimate / BigInt(5)
      setEstimateGas(gasLimit)
    }

    if (tx) {
      estimateGas()
    }
  }, [provider, tx])
  return { estimateGas }
}
