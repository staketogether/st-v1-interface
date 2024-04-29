import useBuyRamp, { BuyRampRequest } from '@/hooks/ramp/useBuyRamp'
import { BrlaBuyEthStep, kycIdVar, kycLevelVar, qrCodeVar, quoteVar, stepsControlBuyCryptoVar } from '@/hooks/ramp/useControlModal'
import useKycLevelInfo from '@/hooks/ramp/useKycLevelInfo'
import useRampActivity from '@/hooks/ramp/useRampActivity'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { Asset } from '@/types/Asset'
import { PaymentMethodType } from '@/types/payment-method.type'
import { ProviderType } from '@/types/provider.type'
import { useReactiveVar } from '@apollo/client'
import { useEffect, useState } from 'react'
import { PiCheckCircleFill, PiCircleLight, PiClockLight } from 'react-icons/pi'
import { useTheme } from 'styled-components'
import { useAccount } from 'wagmi'
import WrapProcessingStep from './WrapProcessingStep'

interface ProcessingKycStepProps {
  product: Asset
  type: 'buy' | 'sell' | 'swap'
}

export default function ProcessingKycStep({ product, type }: ProcessingKycStepProps) {
  const timeToRedirect = 3000
  const theme = useTheme()
  const quote = useReactiveVar(quoteVar)
  const { address } = useAccount()
  const [rampData, setRampData] = useState<BuyRampRequest | undefined>(undefined)
  const { t } = useLocaleTranslation()
  const { buyRampResponse, isError: isErrorBuyRamp } = useBuyRamp('brla', rampData)
  const kycActivity = useReactiveVar(kycIdVar)
  const kyc = useReactiveVar(kycLevelVar)
  const kycActivityId = Number(kyc?.level ?? 0) > 0 || !kycActivity ? undefined : kycActivity
  const { activity, isError } = useRampActivity(ProviderType.brla, kycActivityId ?? undefined)
  const { kycLevelInfo, isLoading } = useKycLevelInfo('brla', kyc?.level ? undefined : address, true)

  const getIcon = (moment: 'waiting' | 'process' | 'success') => {
    const icons = {
      waiting: <PiCircleLight size={32} color={theme.color.secondary} />,
      process: <PiClockLight size={32} color={theme.color.secondary} />,
      success: <PiCheckCircleFill size={32} color={theme.color.green[500]} />
    }

    return icons[moment]
  }

  useEffect(() => {
    if (address && quote && (Number(kyc?.level) > 0 || activity?.status === 'success') && Number(kyc?.level) > 0) {
      if (type === 'buy') {
        setRampData({
          chainId: product.ramp[0].chainId,
          paymentMethod: PaymentMethodType.pix,
          fiatCurrencyCode: 'brl',
          amount: Number(quote.amountBrl),
          accountAddress: address,
          receiverAddress: address,
          convertToChainId: product.ramp[0].bridge?.toChainId,
          convertToToken: product.ramp[0].bridge?.toToken
        })
        return
      }

      if (type === 'sell') {
        // redirect to pix
        setTimeout(() => stepsControlBuyCryptoVar(BrlaBuyEthStep.PixKeyStep), timeToRedirect)
        return
      }
    }
    if (!kycLevelInfo?.level && !kycActivity && !isLoading) {
      setTimeout(() => stepsControlBuyCryptoVar(BrlaBuyEthStep.Kyc), timeToRedirect)
      return
    }
  }, [activity?.status, address, kyc?.level, quote, kycLevelInfo, kycActivity, isLoading, product.ramp, type])

  useEffect(() => {
    if (activity?.status === 'error' && isError) {
      stepsControlBuyCryptoVar(BrlaBuyEthStep.Error)
    }
  }, [activity?.status, isError, isErrorBuyRamp])

  useEffect(() => {
    if (buyRampResponse?.brCode) {
      qrCodeVar(buyRampResponse)
      setTimeout(() => stepsControlBuyCryptoVar(BrlaBuyEthStep.Checkout), timeToRedirect)
    }
  }, [activity?.status, activity?.type, buyRampResponse])

  const validationSteps = [
    {
      icon: getIcon(kycActivityId ? 'process' : 'success'),
      text: t('v2.ramp.processingRegistration'),
      subText: t('v2.ramp.kyc.processTime'),
      disable: !kycActivityId
    },
    {
      icon:
        activity?.status === 'success' && Number(kyc?.level) > 0
          ? getIcon('success')
          : getIcon(Number(kyc?.level) > 0 ? 'process' : 'waiting'),
      text: type === 'buy' ? t('v2.ramp.generatingQRCode') : t('v2.ramp.validatingWithdrawal'),
      disable: activity?.status !== 'success'
    }
  ]

  return <WrapProcessingStep asset={product} validationSteps={validationSteps} title={t('v2.ramp.processingRegistration')} type={type} />
}
