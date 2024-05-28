import { globalConfig } from '@/config/global'
import { PaymentDetails } from '@/types/offRampSell'
import axios from 'axios'
import { useCallback, useState } from 'react'
import { Asset } from '@/types/Asset'
import { RampSteps, rampStepControlVar } from './useRampControlModal'
import { ethers } from 'ethers'
import { useSendTransaction } from 'wagmi'

interface useOffRampSellRequest {
  walletAddress: `0x${string}`
  pixKey: string
  amount: string
  tokenSymbol: string
}

export default function useOffRampSell({ asset }: { asset: Asset }) {
  const [loading, setLoading] = useState(false)
  const [sendSellTokenLoading, setSendSellTokenLoading] = useState(false)
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null)
  const { sendTransaction } = useSendTransaction()

  const verifySellToken = useCallback(
    async (requestBody: useOffRampSellRequest) => {
      setLoading(true)
      try {
        const { backendUrl } = globalConfig
        const paymentDetailsData = await axios.post<PaymentDetails>(`${backendUrl}/api/ramp/sell/${asset.ramp[0].provider}`, {
          ...requestBody,
          chainId: asset.chains[0]
        })
        setPaymentDetails(paymentDetailsData.data)
      } catch (e) {
        setLoading(false)
      }
    },
    [asset.chains, asset.ramp]
  )

  const sendSellTokenTx = useCallback(
    (amount: string) => {
      try {
        if (paymentDetails?.bridge) {
          const { tx } = paymentDetails.bridge
          if (!tx) return
          setSendSellTokenLoading(true)
          sendTransaction(tx, {
            onSuccess: () => {
              rampStepControlVar(RampSteps.Success)
              setSendSellTokenLoading(false)
            },
            onError: () => {
              // rampStepControlVar(RampSteps.QuotationOffRamp)
              setSendSellTokenLoading(false)
            }
          })
          return
        }
        if (paymentDetails?.paymentWalletAddress) {
          sendTransaction(
            {
              to: paymentDetails.paymentWalletAddress,
              value: ethers.parseEther(amount)
            },
            {
              onSuccess: () => {
                rampStepControlVar(RampSteps.Success)
                setSendSellTokenLoading(false)
              },
              onError: () => {
                // rampStepControlVar(RampSteps.QuotationOffRamp)
                setSendSellTokenLoading(false)
              }
            }
          )
        }
      } catch {
        setSendSellTokenLoading(false)
      }
    },
    [paymentDetails, sendTransaction]
  )

  return { verifySellToken, paymentDetails, isLoading: loading, sendSellTokenTx, sendSellTokenLoading }
}
