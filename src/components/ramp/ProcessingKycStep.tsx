import useBuyRamp, { BuyRampRequest } from '@/hooks/ramp/useBuyRamp'
import { RampSteps, kycIdVar, kycLevelVar, qrCodeVar, quoteVar, rampStepControlVar } from '@/hooks/ramp/useRampControlModal'
import useKycLevelInfo from '@/hooks/ramp/useKycLevelInfo'
import useRampActivity from '@/hooks/ramp/useRampActivity'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { PaymentMethodType } from '@/types/payment-method.type'
import { ProviderType } from '@/types/provider.type'
import { useReactiveVar } from '@apollo/client'
import { useEffect, useState } from 'react'
import { PiCheckCircleFill, PiCircleLight, PiClockLight } from 'react-icons/pi'
import { useTheme } from 'styled-components'
import { useAccount } from 'wagmi'
import WrapProcessingStep from './WrapProcessingStep'
import { Asset } from '@/types/Asset'

interface ProcessingKycStepProps {
  asset?: Asset
  chainId: number
  type: 'buy' | 'sell' | 'swap'
}

export default function ProcessingKycStep({ asset, chainId, type }: ProcessingKycStepProps) {
  const [rampData, setRampData] = useState<BuyRampRequest | undefined>(undefined)

  const timeToRedirect = 3000
  const theme = useTheme()
  const quote = useReactiveVar(quoteVar)

  const { address } = useAccount()
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

  const kycVerify = address && quote && (Number(kyc?.level) > 0 || activity?.status === 'success') && Number(kyc?.level) > 0

  useEffect(() => {
    if (kyc?.level === 0 || !quote || !address) {
      return
    }

    if (type === 'buy') {
      setRampData({
        chainIdToReceive: chainId,
        paymentMethod: PaymentMethodType.pix,
        fiatCurrencyCode: 'brl',
        amount: asset?.isFanToken ? Number(quote.amountToken) : Number(quote.amountBrl),
        accountAddress: address,
        receiverAddress: address,
        tokenToReceive: asset?.symbol,
        fixOutput: asset?.isFanToken
      })
      return
    }
    if (type === 'sell') {
      rampStepControlVar(RampSteps.PixKeyStep)
    }
  }, [address, isLoading, kycActivity, kycLevelInfo?.level, kycVerify, asset?.symbol, quote?.amountBrl, quote?.amountToken, type, chainId, asset?.isFanToken, kyc?.level, quote])

  useEffect(() => {
    if (activity?.status === 'error' && isError) {
      rampStepControlVar(RampSteps.Error)
    }
  }, [activity?.status, isError, isErrorBuyRamp])

  useEffect(() => {
    if (buyRampResponse?.brCode) {
      qrCodeVar(buyRampResponse)
      setTimeout(() => rampStepControlVar(RampSteps.Checkout), timeToRedirect)
    }
  }, [activity?.status, activity?.type, kyc, buyRampResponse])



  const validationSteps = [
    {
      icon: getIcon(!activity && !kyc ? 'process' : 'success'),
      text: t('v2.ramp.processingRegistration'),
      subText: t('v2.ramp.kyc.processTime'),
      disable: !activity && !kyc
    },
    {
      icon:
        buyRampResponse?.brCode
          ? getIcon('success')
          : getIcon(Number(kyc?.level) > 0 ? 'process' : 'waiting'),
      text: type === 'buy' ? t('v2.ramp.generatingQRCode') : t('v2.ramp.validatingWithdrawal'),
      disable: !buyRampResponse?.brCode
    }
  ]

  return <WrapProcessingStep asset={asset} chainId={chainId} validationSteps={validationSteps} title={t('v2.ramp.processingRegistration')} type={type} />
}
