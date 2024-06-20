import { globalConfig } from '@/config/global'
import { PaymentDetails } from '@/types/offRampSell'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { StaticAsset } from '@/types/StaticAsset'
import { RampSteps, rampStepControlVar } from './useRampControlModal'
import { ethers } from 'ethers'
import { useSendTransaction, useWaitForTransactionReceipt as useWaitForTransaction } from 'wagmi'
import { chainConfigByChainId } from '@/config/chain'
import { notification } from 'antd'
import useLocaleTranslation from '../useLocaleTranslation'

interface useOffRampSellRequest {
  walletAddress: `0x${string}`
  pixKey: string
  amount: string
  tokenSymbol: string
}

export default function useOffRampSell({ asset }: { asset: StaticAsset }) {
  const [awaitWalletAction, setAwaitWalletAction] = useState(false)
  const [sendSellTokenLoading, setSendSellTokenLoading] = useState(false)
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null)
  const { sendTransaction, data: txHash } = useSendTransaction()
  const { transactionConfig } = chainConfigByChainId(asset.chains[0])
  const { t } = useLocaleTranslation()
  const {
    isLoading,
    isSuccess: awaitTransactionSuccess,
    isError: awaitTransactionErrorIsError
  } = useWaitForTransaction({
    hash: txHash,
    confirmations: transactionConfig.confirmations
  })

  useEffect(() => {
    if (awaitTransactionSuccess && awaitWalletAction) {
      setAwaitWalletAction(false)
      setSendSellTokenLoading(false)
      rampStepControlVar(RampSteps.Success)
    }
  }, [awaitTransactionSuccess, awaitWalletAction])

  useEffect(() => {
    if (awaitTransactionErrorIsError && awaitWalletAction) {
      setAwaitWalletAction(false)
      setSendSellTokenLoading(false)
      rampStepControlVar(RampSteps.QuotationOffRamp)
      notification.error({
        message: `${t('notifications.withdrawError')}`,
        placement: 'topRight'
      })
    }
  }, [awaitTransactionErrorIsError, t, awaitWalletAction])

  const verifySellToken = useCallback(
    async (requestBody: useOffRampSellRequest) => {
      setAwaitWalletAction(true)
      try {
        const { backendUrl } = globalConfig
        const paymentDetailsData = await axios.post<PaymentDetails>(`${backendUrl}/api/ramp/sell/${asset.ramp[0].provider}`, {
          ...requestBody,
          chainId: asset.chains[0]
        })
        setPaymentDetails(paymentDetailsData.data)
      } catch (e) {
        setAwaitWalletAction(false)
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
          sendTransaction(tx)
          return
        }
        if (paymentDetails?.paymentWalletAddress) {
          sendTransaction({
            to: paymentDetails.paymentWalletAddress,
            value: ethers.parseEther(amount)
          })
        }
      } catch {
        setSendSellTokenLoading(false)
      }
    },
    [paymentDetails, sendTransaction]
  )

  return {
    verifySellToken,
    paymentDetails,
    isLoading: awaitWalletAction || isLoading,
    sendSellTokenTx,
    sendSellTokenLoading,
    awaitTransactionErrorIsError,
    awaitTransactionSuccess
  }
}
