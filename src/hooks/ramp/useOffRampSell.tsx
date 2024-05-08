import { globalConfig } from '@/config/global'
import { PaymentDetails } from '@/types/offRampSell'
import { ProviderType } from '@/types/provider.type'
import axios from 'axios'
import { useCallback, useState } from 'react'
import usePaymasterSmartWallet from '../usePaymasterSmartWallet'
import { RampSteps, rampStepControlVar } from './useControlModal'

interface useOffRampSellRequest {
  walletAddress: `0x${string}`
  pixKey: string
  amount: string
  tokenSymbol: string
}

export default function useOffRampSell({ chainId, rampProvider }: { chainId: number; rampProvider: ProviderType }) {
  const [loading, setLoading] = useState(false)
  const { smartWallet } = usePaymasterSmartWallet({ chainId })

  const sendSellToken = useCallback(
    async (requestBody: useOffRampSellRequest) => {
      if (!smartWallet) return
      setLoading(true)
      try {
        const { backendUrl } = globalConfig
        const paymentDetails = await axios.post<PaymentDetails>(`${backendUrl}/api/ramp/sell/${rampProvider}`, { ...requestBody, chainId })
        if (paymentDetails.data.bridge) {
          const { tx } = paymentDetails.data.bridge
          const teste = await smartWallet.sendTransaction(tx)
          console.log('teste', teste)
          rampStepControlVar(RampSteps.Success)
        } else {
          await smartWallet.sendTransaction({
            to: paymentDetails.data.paymentWalletAddress,
            value: requestBody.amount
          })
        }
        setLoading(false)
      } catch {
        rampStepControlVar(RampSteps.QuotationOffRamp)
        setLoading(false)
      }
    },
    [rampProvider, smartWallet, chainId]
  )

  return { sendSellToken, loading }
}
