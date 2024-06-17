import { RampSteps, qrCodeVar, rampStepControlVar } from '@/hooks/ramp/useRampControlModal'
import useRampActivity from '@/hooks/ramp/useRampActivity'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { Asset } from '@/types/Asset'
import { RampProviderType } from '@/types/rampProviderType'
import { useReactiveVar } from '@apollo/client'
import { useEffect } from 'react'
import { PiClockLight } from 'react-icons/pi'
import loadingAnimation from '@assets/animations/loading-animation.json'
import { useTheme } from 'styled-components'
import WrapProcessingStep from './WrapProcessingStep'
import LottieAnimation from '../shared/LottieAnimation'
import successAnimation from '@assets/animations/success-animation.json'

interface ProcessingCheckoutStepProps {
  product: Asset
  type: 'buy' | 'sell' | 'swap'
}

export default function ProcessingCheckoutStep({ product, type }: ProcessingCheckoutStepProps) {
  const theme = useTheme()
  const timeToRedirect = 3000
  const { t } = useLocaleTranslation()
  const qrCode = useReactiveVar(qrCodeVar)

  const { activity } = useRampActivity(RampProviderType.brla, qrCode?.id)

  if (activity?.status === 'success') {
    setTimeout(() => rampStepControlVar(RampSteps.Success), timeToRedirect)
  }

  useEffect(() => {
    if (activity?.status === 'error') {
      rampStepControlVar(RampSteps.Error)
    }
  }, [activity?.status])

  const isPaymentIdentified = activity?.status === 'posted' || activity?.status === 'success'

  const getIcon = (moment: 'waiting' | 'process' | 'success') => {
    const icons = {
      waiting: <LottieAnimation animationData={loadingAnimation} height={32} loop />,
      process: <PiClockLight size={32} color={theme.color.secondary} />,
      success: <LottieAnimation animationData={successAnimation} height={32} />
    }

    return icons[moment]
  }

  const paymentStatus = activity?.status === 'success' ? 'success' : 'process'
  const successfulBridging =
    activity?.additionalData &&
    activity.additionalData.bridge &&
    typeof activity.additionalData.bridge === 'object' &&
    'txHash' in activity.additionalData.bridge
  const finishedPayment = product.ramp[0].bridge ? paymentStatus === 'success' && !!successfulBridging : paymentStatus === 'success'

  const validationSteps = [
    {
      icon: getIcon(isPaymentIdentified ? 'success' : 'process'),
      text: t('v2.ramp.paymentIdentified')
    },
    {
      icon: !isPaymentIdentified ? getIcon('waiting') : getIcon(finishedPayment ? 'success' : 'process'),
      text: t('v2.ramp.mintingBRLA'),
      disable: !finishedPayment
    }
  ]

  return <WrapProcessingStep asset={product} validationSteps={validationSteps} title={t('v2.ramp.processingPayment')} type={type} />
}
