import { chainConfigByChainId } from '@/config/chain'
import { BiconomySmartAccountV2, createSmartAccountClient } from '@biconomy/account'
import { useEffect, useState } from 'react'
import { useWalletClient } from 'wagmi'

interface usePaymasterSmartWalletProps {
  chainId: number
}

export default function usePaymasterSmartWallet({ chainId }: usePaymasterSmartWalletProps) {
  const [smartWallet, setSmartWallet] = useState<undefined | BiconomySmartAccountV2>(undefined)
  const { paymasterKey } = chainConfigByChainId(chainId)
  const { data: walletClient } = useWalletClient()

  useEffect(() => {
    async function createSmartWallet() {
      if (!walletClient) return
      const smartWalletProvider = await createSmartAccountClient({
        signer: walletClient,
        biconomyPaymasterApiKey: paymasterKey,
        bundlerUrl: `https://bundler.biconomy.io/api/v2/${chainId}/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`
      })
      setSmartWallet(smartWalletProvider)
    }
    createSmartWallet()
  }, [paymasterKey, walletClient, chainId])

  return { smartWallet }
}
