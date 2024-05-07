import { amountToQuoteVar, offRampPixKeyVar } from '@/hooks/ramp/useControlModal'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { Asset } from '@/types/Asset'
import { useReactiveVar } from '@apollo/client'
import { PiCheckCircleFill, PiClockLight } from 'react-icons/pi'
import { useTheme } from 'styled-components'
import WrapProcessingStep from './WrapProcessingStep'
import loadingAnimation from '@assets/animations/loading-animation.json'
import LottieAnimation from '../shared/LottieAnimation'
import { useEffect } from 'react'
import useOffRampSell from '@/hooks/ramp/useOffRampSell'
import { ProviderType } from '@/types/provider.type'
interface ProcessingCheckoutStepProps {
  asset: Asset
  type: 'buy' | 'sell' | 'swap'
  walletAddress: `0x${string}` | undefined
}

export default function ProcessingCheckoutOffRampStep({ asset, type, walletAddress }: ProcessingCheckoutStepProps) {
  const theme = useTheme()
  const { t } = useLocaleTranslation()

  const offRampPixKey = useReactiveVar(offRampPixKeyVar)
  const fiatAmount = useReactiveVar(amountToQuoteVar)
  const address = walletAddress ?? '0x'

  const { sendSellToken } = useOffRampSell({
    requestBody: {
      walletAddress: address,
      pixKey: offRampPixKey,
      amount: fiatAmount,
      chainId: asset.chains[0],
      tokenSymbol: asset.symbol
    },
    rampProvider: ProviderType.brla
  })

  const getIcon = (moment: 'waiting' | 'process' | 'success') => {
    const icons = {
      waiting: <LottieAnimation animationData={loadingAnimation} height={32} loop />,
      process: <PiClockLight size={32} color={theme.color.secondary} />,
      success: <PiCheckCircleFill size={32} color={theme.color.green[500]} />
    }
    return icons[moment]
  }

  useEffect(() => {
    sendSellToken()
  }, [sendSellToken])

  const validationSteps = [
    {
      icon: getIcon('waiting'),
      text: t('v2.ramp.offRamp.requestRequested')
    }
    // {
    //   icon: getIcon(isPaymentIdentified ? 'success' : 'process'),
    //   text: 'Realizar transferencia para brla'
    // },
    // {
    //   icon: !isPaymentIdentified ? getIcon('waiting') : getIcon(finishedPayment ? 'success' : 'process'),
    //   text: 'Aguardando Transação',
    //   disable: !finishedPayment
    // }
  ]

  return <WrapProcessingStep asset={asset} validationSteps={validationSteps} title={t('v2.ramp.processingPayment')} type={type} />
}
