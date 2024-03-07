import { BrlaBuyEthStep, clearModal, qrCodeVar, quoteVar, stepsControlBuyCryptoVar } from '@/hooks/ramp/useControlModal'
import usePixBankInfo from '@/hooks/ramp/usePixBankInfo'
import useVerifyActivity from '@/hooks/ramp/useVerifyActivity'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { ProviderType } from '@/types/provider.type'
import { useReactiveVar } from '@apollo/client'
import { QRCode, notification } from 'antd'
import { useEffect } from 'react'
import { PiCopy } from 'react-icons/pi'
import styled from 'styled-components'
import { useAccount } from 'wagmi'
import Button from '../shared/Button'
import SwapInfo from './SwapInfo'

export default function CheckoutStep() {
  const { t } = useLocaleTranslation()
  const qrCode = useReactiveVar(qrCodeVar)
  const quote = useReactiveVar(quoteVar)
  const { address } = useAccount()
  const { pixBankInfo } = usePixBankInfo(ProviderType.brla, qrCode?.id, address)
  const { activity } = useVerifyActivity(ProviderType.brla, qrCode?.id)

  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(qrCode?.brCode ?? '')
    notification.success({
      message: t('v2.ramp.copyCodeSuccess'),
      placement: 'topRight'
    })
  }

  useEffect(() => {
    if (activity?.type === 'pix-to-token' && (activity.status !== 'error' && activity.status !== 'created')) {
      stepsControlBuyCryptoVar(BrlaBuyEthStep.ProcessingCheckoutStep)
    }
  }, [activity])
  return (
    <Container>

      <Body>
        <SwapInfo />
        <PixArea>
          <Header>
            <div>
              <span>{t('v2.ramp.amountToBePaid')}:</span>
              <span>R$ {quote?.amountBrl}</span>
            </div>
            <span>
              {t('v2.ramp.checkout.for')} {pixBankInfo?.name}
              {pixBankInfo?.taxId}
              {t('v2.ramp.checkout.bank')}: {pixBankInfo?.bankName}
            </span>
          </Header>
          <QrCodeArea>
            <span>{t('v2.ramp.useThePixQRCode')}</span>
            <Code value={qrCode?.brCode ?? ''} />
            <Button
              form='kycForm'
              type='submit'
              label={t('v2.ramp.copyQrCode')}
              icon={<PiCopy />}
              iconLeft
              onClick={handleCopyClipboard}
            />
          </QrCodeArea>
        </PixArea>
        <KeyPixArea>
          <span>{t('v2.ramp.orUseThePixKey')}</span>
          <Button
            type='button'
            label={qrCode?.brCode ?? ''}
            icon={<PiCopy />}
            iconLeft
            className='ghost'
            fontSize={10}
          />
        </KeyPixArea>
      </Body>
      <Footer>
        <Button type='button' label={t('v2.ramp.cancelDeposit')} className='outline' block onClick={clearModal} />
      </Footer>
    </Container>
  )
}

const { Container, PixArea, Header, Body, Code, KeyPixArea, QrCodeArea, Footer } = {
  Container: styled.div`
    max-width: 420px;
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      min-width: 372px;
    }
    font-size: ${({ theme }) => theme.font.size[13]};
    font-weight: 400;

    gap: 24px;
    margin-right: 5px;
  `,
  Body: styled.div`
    padding: 0 ${({ theme }) => theme.size[24]};
    overflow-y: scroll;
    max-height: 470px;
    gap: 24px;
    display: flex;
    flex-direction: column;
  `,
  PixArea: styled.div`
    display: grid;
    grid-template-rows: 127px 1fr;
    border: 1px solid ${({ theme }) => theme.colorV2.gray[6]};
    border-radius: ${({ theme }) => theme.size[8]};
  `,
  Header: styled.div`
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background: ${({ theme }) => theme.colorV2.gray[2]};
    padding: ${({ theme }) => theme.size[12]};
    border-radius: ${({ theme }) => theme.size[8]} ${({ theme }) => theme.size[8]} 0px 0px;
    gap: ${({ theme }) => theme.size[12]};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      > span:last-child {
        font-size: ${({ theme }) => theme.font.size[22]};
        font-weight: 500;
        line-height: 27px;
        letter-spacing: 0em;
        text-align: left;
      }
    }
    > span {
      text-align: center;
    }
  `,
  QrCodeArea: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.size[12]};
    padding: ${({ theme }) => theme.size[24]};
    > span {
      //styleName: text 15 bold;

      font-size: ${({ theme }) => theme.font.size[15]};
      font-weight: 500;
      line-height: 18px;
      letter-spacing: 0em;
      text-align: left;
    }
  `,
  Footer: styled.div`
    padding: 16px 29px 24px 24px;
    display: grid;
  `,
  Code: styled(QRCode)`
    border: none;
    width: 120px !important;
    height: 120px !important;
  `,
  KeyPixArea: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${({ theme }) => theme.size[12]};
    gap: ${({ theme }) => theme.size[12]};
    border: 1px solid ${({ theme }) => theme.colorV2.gray[6]};
    border-radius: ${({ theme }) => theme.size[8]};
  `
}
