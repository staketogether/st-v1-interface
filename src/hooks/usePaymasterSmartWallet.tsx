import { chainConfigByChainId } from '@/config/chain'
import { BiconomySmartAccountV2, createSmartAccountClient } from '@biconomy/account'
import { useEffect, useState } from 'react'
import { useAccount, useWalletClient } from 'wagmi'

interface usePaymasterSmartWalletProps {
  chainId: number
}

export default function usePaymasterSmartWallet({ chainId }: usePaymasterSmartWalletProps) {
  const [smartWallet, setSmartWallet] = useState<undefined | BiconomySmartAccountV2>(undefined)
  const { paymasterKey } = chainConfigByChainId(chainId)
  const { data: walletClient } = useWalletClient()
  const { chain: walletChainId } = useAccount()
  const isWrongNetwork = chainId !== walletChainId?.id

  useEffect(() => {
    async function createSmartWallet() {
      if (!walletClient || isWrongNetwork) return
      const smartWalletProvider = await createSmartAccountClient({
        signer: walletClient,
        biconomyPaymasterApiKey: paymasterKey,
        bundlerUrl: `https://bundler.biconomy.io/api/v2/${chainId}/dewj2189.wh1289hU-7E49-45ic-af80-f3HiQHBJs`
      })
      setSmartWallet(smartWalletProvider)
    }
    createSmartWallet()
  }, [paymasterKey, walletClient, chainId, isWrongNetwork])

  return { smartWallet }
}
