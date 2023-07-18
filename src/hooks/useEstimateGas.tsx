import chainConfig from '@/config/chain'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

export default function useEstimateGas(tx?: ethers.TransactionRequest) {
  const [estimateGas, setEstimateGas] = useState('0')
  const { provider } = chainConfig()
  useEffect(() => {
    const estimateGas = async () => {
      const amountGat = await provider.estimateGas(tx as ethers.TransactionRequest)
      setEstimateGas(ethers.formatUnits(amountGat, 'gwei'))
    }

    if (tx && tx?.data) {
      estimateGas()
    }
  }, [provider, tx])
  return { estimateGas }
}
