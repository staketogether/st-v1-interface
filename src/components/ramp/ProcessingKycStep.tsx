import useBuyRamp, { BuyRampRequest } from '@/hooks/ramp/useBuyRamp';
import { BrlaBuyEthStep, qrCodeVar, quoteVar, stepsControlBuyCrypto } from '@/hooks/ramp/useControlModal';
import useLocaleTranslation from '@/hooks/useLocaleTranslation';
import { PaymentMethodType } from '@/types/payment-method.type';
import { useReactiveVar } from '@apollo/client';
import { useEffect, useState } from 'react';
import { PiCircleLight, PiClockLight } from 'react-icons/pi';
import { useTheme } from "styled-components";
import { useAccount } from 'wagmi';
import WrapProcessingStep from './WrapProcessingStep';

export default function ProcessingKycStep() {

  const theme = useTheme()
  const quote = useReactiveVar(quoteVar)
  const { address } = useAccount()
  const [rampData, setRampData] = useState<BuyRampRequest | undefined>(undefined)
  const { t } = useLocaleTranslation()
  const { buyRampResponse } = useBuyRamp('brla', rampData)
  useEffect(() => {
    if (address && quote) {
      setRampData({
        chainId: 1,
        paymentMethod: PaymentMethodType.pix,
        fiatCurrencyCode: 'brl',
        amount: Number(quote.amountFiat),
        accountAddress: address,
        receiverAddress: address
      })
    }
  }, [address, quote])

  useEffect(() => {
    if (buyRampResponse?.brCode) {
      qrCodeVar(buyRampResponse)
      stepsControlBuyCrypto(BrlaBuyEthStep.Checkout)
    }

  }, [buyRampResponse])
  const validationSteps = [
    {
      icon: <PiClockLight size={32} color={theme.color.secondary} />,
      text: t('v2.ramp.processingRegistration'),
      disable: false
    },
    {
      icon: <PiCircleLight size={32} color={theme.color.secondary} />,
      text: t('v2.ramp.generatingQRCode'),
      disable: true
    }
  ]

  return (<WrapProcessingStep validationSteps={validationSteps} title={t('v2.ramp.processingRegistration')} />)
}
