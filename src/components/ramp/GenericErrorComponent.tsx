import React from 'react'
import styled from 'styled-components'
import { PiWarningOctagon } from 'react-icons/pi'
import Button from '../shared/Button'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { clearModal } from '@/hooks/ramp/useControlModal'

export default function GenericErrorComponent() {
  const { t } = useLocaleTranslation()
  return (
    <Container>
      <AlertIcon />
      <span>{t('genericErrorMessage')}</span>
      <Button label={'close'} block onClick={clearModal} />
    </Container>
  )
}
const { Container, AlertIcon } = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.size[24]};
    text-align: center;
    > span {
      color: ${({ theme }) => theme.colorV2.blue[1]};
      font-size: 18px;
      font-weight: 500;
      max-width: 317px;
    }
  `,
  AlertIcon: styled(PiWarningOctagon)`
    font-size: 60px;
    color: ${({ theme }) => theme.colorV2.purple[1]};
  `
}
