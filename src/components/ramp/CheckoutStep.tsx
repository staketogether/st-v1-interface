import { QRCode } from "antd"
import { PiCopy } from "react-icons/pi"
import styled from "styled-components"
import Button from "../shared/Button"
import SwapInfo from "./SwapInfo"

export default function CheckoutStep() {
  return (
    <Container>
      <SwapInfo />
      <PixArea>
        <Header>
          <div>
            <span>Valor a ser pago:</span>
            <span>R$ 9.935,34</span>
          </div>
          <span>
            Para `Nome da empresa responsável`
            Banco: 237 - Bradesco
            Identificador: ##########
          </span>
        </Header>
        <Body>
          <span>Use o QR Code do Pix para pagar</span>
          <Code value="heyc 123123123" />
          <Button form='kycForm' type='submit' label={'Copiar código do QR Code'} icon={<PiCopy />} iconLeft />
        </Body>


      </PixArea>
      <KeyPixArea>
        <span>Ou use a Chave Pix</span>
        <Button type="button" label="fa9a63e7-359d-46bd-8838-8ca249f153a0" icon={<PiCopy />} iconLeft className="ghost" />
      </KeyPixArea>
      <Button type="button" label="Cancelar Depósito" className="outline" block />
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
