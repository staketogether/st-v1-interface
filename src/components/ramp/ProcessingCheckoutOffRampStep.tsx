import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { Asset } from '@/types/Asset'
import { PiCheckCircleFill, PiCircleLight, PiClockLight } from 'react-icons/pi'
import { useTheme } from 'styled-components'
import WrapProcessingStep from './WrapProcessingStep'
import useOffRampSell from '@/hooks/ramp/useOffRampSell'
import { ProviderType } from '@/types/provider.type'
import { useReactiveVar } from '@apollo/client'
import { fiatAmountVar, offRampPixKeyVar } from '@/hooks/ramp/useControlModal'
import { useEffect } from 'react'

interface ProcessingCheckoutStepProps {
  asset: Asset
  type: 'buy' | 'sell' | 'swap'
  walletAddress: `0x${string}` | undefined
}

export default function ProcessingCheckoutOffRampStep({ asset, type, walletAddress }: ProcessingCheckoutStepProps) {
  const theme = useTheme()
  const { t } = useLocaleTranslation()

  const offRampPixKey = useReactiveVar(offRampPixKeyVar)
  const fiatAmount = useReactiveVar(fiatAmountVar)
  const address = walletAddress ?? '0x'

  const { sendSellToken, loading } = useOffRampSell({
    requestBody: {
      walletAddress: address,
      pixKey: fiatAmount,
      amount: offRampPixKey,
      chainId: asset.chains[0],
      tokenSymbol: asset.symbol
    },
    rampProvider: ProviderType.brla
  })

  const getIcon = (moment: 'waiting' | 'process' | 'success') => {
    const icons = {
      waiting: <PiCircleLight size={32} color={theme.color.secondary} />,
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
