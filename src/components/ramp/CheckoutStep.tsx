import { qrCodeVar, quoteVar } from "@/hooks/ramp/useControlModal"
import useLocaleTranslation from "@/hooks/useLocaleTranslation"
import { useReactiveVar } from "@apollo/client"
import { QRCode, notification } from "antd"
import { PiCopy } from "react-icons/pi"
import styled from "styled-components"
import Button from "../shared/Button"
import SwapInfo from "./SwapInfo"

export default function CheckoutStep() {
  const { t } = useLocaleTranslation()
  const qrCode = useReactiveVar(qrCodeVar)
  const quote = useReactiveVar(quoteVar)

  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(qrCode?.brCode ?? '')
    notification.success({
      message: `código copiado com sucesso`,
      placement: 'topRight'
    })
  }
  return (
    <Container>
      <SwapInfo />
      <PixArea>
        <Header>
          <div>
            <span>{t('v2.ramp.amountToBePaid')}:</span>
            <span>R$ {quote?.amountBrl}</span>
          </div>
          <span>
            Para `Nome da empresa responsável`
            Banco: 237 - Bradesco
            Identificador: ##########
          </span>
        </Header>
        <Body>
          <span>{t('v2.ramp.useThePixQRCode')}</span>
          <Code value={qrCode?.brCode ?? ''} />
          <Button form='kycForm' type='submit' label={t('v2.ramp.copyQrCode')} icon={<PiCopy />} iconLeft onClick={handleCopyClipboard} />
        </Body>


      </PixArea>
      <KeyPixArea>
        <span>{t('v2.ramp.orUseThePixKey')}</span>
        <Button type="button" label={qrCode?.brCode ?? ''} icon={<PiCopy />} iconLeft className="ghost" fontSize={10} />
      </KeyPixArea>
      <Button type="button" label={t('v2.ramp.cancelDeposit')} className="outline" block />
    </Container>
  )
}

const { Container, PixArea, Header, Body, Code, KeyPixArea } = {
  Container: styled.div`
    width: 420px;
    font-size: 13px;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    gap: 24px;
  `,
  PixArea: styled.div`
    display: grid;
    grid-template-rows: 127px 1fr;
    border: 1px solid #A0A5AB;
    border-radius: 8px;
  `,
  Header: styled.div`
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background: linear-gradient(0deg, #F3F3F3, #F3F3F3),
      linear-gradient(0deg, #A0A5AB, #A0A5AB);

    padding: 12px;
    border-radius: 8px 8px 0px 0px;
    gap: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      > span:last-child {
        font-size: 22px;
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
  Body: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 24px;
    > span {
      //styleName: text 15 bold;

      font-size: 15px;
      font-weight: 500;
      line-height: 18px;
      letter-spacing: 0em;
      text-align: left;

    }
  
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
    padding: 12px;
    gap: 12px;
    border: 1px solid #A0A5AB;
    border-radius: 8px;

  
  `
}
