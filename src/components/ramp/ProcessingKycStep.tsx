import useLocaleTranslation from '@/hooks/useLocaleTranslation';
import { PiCircleLight, PiClockLight } from 'react-icons/pi';
import { useTheme } from "styled-components";
import WrapProcessingStep from './WrapProcessingStep';

export default function ProcessingKycStep() {

  const theme = useTheme()
  const { t } = useLocaleTranslation()
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
