import { globalConfig } from '@/config/global'
import { PaymentDetails } from '@/types/offRampSell'
import { ProviderType } from '@/types/provider.type'
import axios from 'axios'
import { useCallback, useState } from 'react'
import usePaymasterSmartWallet from '../usePaymasterSmartWallet'
import { RampSteps, rampStepControlVar } from './useRampControlModal'
import { PaymasterMode } from '@biconomy/account'
import { encodeFunctionData, erc20Abi } from 'viem'

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
          const approveTxData = encodeFunctionData({
            abi: erc20Abi,
            args: [await smartWallet.getAddress(), BigInt(paymentDetails.data.maximumTokenAmount)],
            functionName: 'approve'
          })

          console.log(approveTxData, 'approveTxData')

          const approveTx = {
            to: paymentDetails.data.bridge.tx.to,
            data: approveTxData
          }

          const { tx: sellTx } = paymentDetails.data.bridge

          console.log([approveTx, sellTx], 'txs')

          const userOp = await smartWallet.buildUserOp([approveTx, sellTx], {
            paymasterServiceData: { mode: PaymasterMode.SPONSORED }
          })

          console.log('userOp', userOp)

          const opResponse = await smartWallet.sendUserOp(userOp)
          const opStatus = await opResponse.waitForTxHash()
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
      } catch {
        rampStepControlVar(RampSteps.QuotationOffRamp)
        setLoading(false)
      }
    },
    [rampProvider, smartWallet, chainId]
  )

  return { sendSellToken, loading }
}
