import { PaymentDetails } from '@/types/offRampSell'
import { ProviderType } from '@/types/provider.type'
import axios from 'axios'
import { useState } from 'react'
import usePaymasterSmartWallet from '../usePaymasterSmartWallet'

interface useOffRampSellRequest {
  walletAddress: `0x${string}`
  pixKey: string
  amount: string
  chainId: number
  tokenSymbol: string
}

export default function useOffRampSell({ requestBody, rampProvider }: { requestBody: useOffRampSellRequest; rampProvider: ProviderType }) {
  const [loading, setLoading] = useState(false)
  const { smartWallet } = usePaymasterSmartWallet({ chainId: requestBody.chainId })

  async function sendSellToken() {
    if (!smartWallet) return
    setLoading(true)
    try {
      const paymentDetails = await axios.post<PaymentDetails>(`/api/ramp/sell/${rampProvider}`, requestBody)
      if (paymentDetails.data.bridge) {
        const { tx } = paymentDetails.data.bridge
        await smartWallet.sendTransaction(tx)
      } else {
        await smartWallet.sendTransaction({
          to: paymentDetails.data.paymentWalletAddress,
          value: requestBody.amount
        })
      }
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  return { sendSellToken, loading }
}
