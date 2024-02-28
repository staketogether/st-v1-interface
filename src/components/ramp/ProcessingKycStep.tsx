import useBuyRamp, { BuyRampRequest } from '@/hooks/ramp/useBuyRamp';
import { BrlaBuyEthStep, kycId, kycLevel, qrCodeVar, quoteVar, stepsControlBuyCrypto } from '@/hooks/ramp/useControlModal';
import useVerifyActivity from '@/hooks/ramp/useVerifyActivity';
import useLocaleTranslation from '@/hooks/useLocaleTranslation';
import { PaymentMethodType } from '@/types/payment-method.type';
import { ProviderType } from '@/types/provider.type';
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
  const kycActivity = useReactiveVar(kycId)
  const kyc = useReactiveVar(kycLevel)
  const kycActivityId = kyc?.level && kycActivity ? undefined : kycActivity
  const { activity } = useVerifyActivity(ProviderType.brla, kycActivityId ?? undefined)

  useEffect(() => {
    if (address && quote && (kyc?.level || activity?.status === 'success')) {

      setRampData({
        chainId: 1,
        paymentMethod: PaymentMethodType.pix,
        fiatCurrencyCode: 'brl',
        amount: Number(quote.amountBrl),
        accountAddress: address,
        receiverAddress: address
      })
    }
  }, [activity?.status, address, kyc?.level, quote])

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
      disable: !kycActivityId
    },
    {
      icon: <PiCircleLight size={32} color={theme.color.secondary} />,
      text: t('v2.ramp.generatingQRCode'),
      disable: activity?.status !== 'success'
    }
  ]

  return (<WrapProcessingStep validationSteps={validationSteps} title={t('v2.ramp.processingRegistration')} />)
}
