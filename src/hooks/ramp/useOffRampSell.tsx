import { globalConfig } from '@/config/global'
import { PaymentDetails } from '@/types/offRampSell'
import axios from 'axios'
import { useCallback, useState } from 'react'
import usePaymasterSmartWallet from '../usePaymasterSmartWallet'
import { RampSteps, rampStepControlVar } from './useRampControlModal'
import { PaymasterMode } from '@biconomy/account'
import { encodeFunctionData, erc20Abi } from 'viem'
import { Asset } from '@/types/Asset'
import { useAccount } from 'wagmi'

interface useOffRampSellRequest {
  walletAddress: `0x${string}`
  pixKey: string
  amount: string
  tokenSymbol: string
}

export default function useOffRampSell({ asset }: { asset: Asset }) {
  const [loading, setLoading] = useState(false)
  const { smartWallet } = usePaymasterSmartWallet({ chainId: asset.chains[0] })
  const { address } = useAccount()

  const sendSellToken = useCallback(
    async (requestBody: useOffRampSellRequest) => {
      if (!smartWallet) return
      setLoading(true)
      try {
        const { backendUrl } = globalConfig
        const paymentDetails = await axios.post<PaymentDetails>(`${backendUrl}/api/ramp/sell/${asset.ramp[0].provider}`, {
          ...requestBody,
          chainId: asset.chains[0]
        })
        if (paymentDetails.data.bridge) {
          const { tx } = paymentDetails.data.bridge
          const sellTx = {
            to: tx.to,
            data: tx.data,
            value: tx.value
          }

          const userOp = await smartWallet.sendTransaction(sellTx, {
            paymasterServiceData: { mode: PaymasterMode.SPONSORED }
          })

          const opStatus = await userOp.waitForTxHash()
          console.log('opStatus', opStatus)
          rampStepControlVar(RampSteps.Success)
        } else {
          await smartWallet.sendTransaction(
            {
              to: paymentDetails.data.paymentWalletAddress,
              value: requestBody.amount
            },
            { paymasterServiceData: { mode: PaymasterMode.SPONSORED } }
          )
        }
        setLoading(false)
      } catch (e) {
        console.log(e)
        rampStepControlVar(RampSteps.QuotationOffRamp)
        setLoading(false)
      }
    },
    [asset.chains, asset.ramp, smartWallet]
  )

  return { sendSellToken, loading }
}
