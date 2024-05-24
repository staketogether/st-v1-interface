import { globalConfig } from '@/config/global'
import { PaymentDetails } from '@/types/offRampSell'
import axios from 'axios'
import { useCallback, useState } from 'react'
import { RampSteps, rampStepControlVar } from './useRampControlModal'
import { Asset } from '@/types/Asset'
import { useSendTransaction } from 'wagmi'
import { ethers } from 'ethers'

interface useOffRampSellRequest {
  walletAddress: `0x${string}`
  pixKey: string
  amount: string
  tokenSymbol: string
}

export default function useOffRampSell({ asset }: { asset: Asset }) {
  const [loading, setLoading] = useState(false)
  const { sendTransaction } = useSendTransaction()

  const sendSellToken = useCallback(
    async (requestBody: useOffRampSellRequest) => {
      setLoading(true)
      try {
        const { backendUrl } = globalConfig
        const paymentDetails = await axios.post<PaymentDetails>(`${backendUrl}/api/ramp/sell/${asset.ramp[0].provider}`, {
          ...requestBody,
          chainId: asset.chains[0]
        })
        if (paymentDetails.data.bridge) {
          const { tx } = paymentDetails.data.bridge
          if (!tx) return
          sendTransaction(tx, {
            onSuccess: () => {
              rampStepControlVar(RampSteps.Success)
            },
            onError: () => {
              rampStepControlVar(RampSteps.QuotationOffRamp)
            }
          })
        } else {
          sendTransaction(
            {
              to: paymentDetails.data.paymentWalletAddress,
              value: ethers.parseEther(requestBody.amount)
            },
            {
              onSuccess: () => {
                rampStepControlVar(RampSteps.Success)
              },
              onError: () => {
                rampStepControlVar(RampSteps.QuotationOffRamp)
              }
            }
          )
        }
      } catch (e) {
        console.log(e)
        rampStepControlVar(RampSteps.QuotationOffRamp)
        setLoading(false)
      }
    },
    [asset.chains, asset.ramp, sendTransaction]
  )

  return { sendSellToken, isLoading: loading }
}
