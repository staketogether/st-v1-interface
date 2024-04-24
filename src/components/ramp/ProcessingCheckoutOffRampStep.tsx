import { BrlaBuyEthStep, qrCodeVar, stepsControlBuyCryptoVar } from '@/hooks/ramp/useControlModal'
import useRampActivity from '@/hooks/ramp/useRampActivity'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { Asset } from '@/types/Asset'
import { ProviderType } from '@/types/provider.type'
import { useReactiveVar } from '@apollo/client'
import { useEffect } from 'react'
import { PiCheckCircleFill, PiCircleLight, PiClockLight } from 'react-icons/pi'
import { useTheme } from 'styled-components'
import WrapProcessingStep from './WrapProcessingStep'

interface ProcessingCheckoutStepProps {
  product: Asset
  type: 'buy' | 'sell' | 'swap'
}

export default function ProcessingCheckoutOffRampStep({ product, type }: ProcessingCheckoutStepProps) {
  const theme = useTheme()
  const timeToRedirect = 3000
  const { t } = useLocaleTranslation()
  const qrCode = useReactiveVar(qrCodeVar)

  const { activity } = useRampActivity(ProviderType.brla, qrCode?.id)

  if (activity?.status === 'success') {
    setTimeout(() => stepsControlBuyCryptoVar(BrlaBuyEthStep.Success), timeToRedirect)
  }

  useEffect(() => {
    if (activity?.status === 'error') {
      stepsControlBuyCryptoVar(BrlaBuyEthStep.Error)
    }
  }, [activity?.status])

  const isPaymentIdentified = activity?.status === 'posted' || activity?.status === 'success'

  const getIcon = (moment: 'waiting' | 'process' | 'success') => {
    const icons = {
      waiting: <PiCircleLight size={32} color={theme.color.secondary} />,
      process: <PiClockLight size={32} color={theme.color.secondary} />,
      success: <PiCheckCircleFill size={32} color={theme.color.green[500]} />
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
      text: t('v2.ramp.offRamp.requestRequested')
    },
    {
      icon: getIcon(isPaymentIdentified ? 'success' : 'process'),
      text: t('v2.ramp.offRamp.exchange')
    },
    {
      icon: !isPaymentIdentified ? getIcon('waiting') : getIcon(finishedPayment ? 'success' : 'process'),
      text: t('v2.ramp.offRamp.sendingPix'),
      disable: !finishedPayment
    }
  ]

  return <WrapProcessingStep asset={product} validationSteps={validationSteps} title={t('v2.ramp.processingPayment')} type={type} />
}
