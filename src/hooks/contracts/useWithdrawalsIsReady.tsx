import { useEffect, useState } from 'react'
import chainConfig from '../../config/chain'
import { useWithdrawalsIsWithdrawReady } from '@/types/Contracts'
import { getContractsByProductName } from '@/config/product'

export default function useWithdrawalsIsReady(amount: bigint = 0n) {
  const { isTestnet } = chainConfig()
  //SE FORMOS USAR ADICIONAR O PRODUTO
  const { Withdrawals } = getContractsByProductName({
    productName: 'ethereum-stake',
    isTestnet
  })

  const [isReady, setIsReady] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const { isLoading } = useWithdrawalsIsWithdrawReady({
    address: Withdrawals,
    args: [amount],
    onSuccess: data => {
      setIsReady(data)
    }
  })

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  return { isReady, loading }
}
