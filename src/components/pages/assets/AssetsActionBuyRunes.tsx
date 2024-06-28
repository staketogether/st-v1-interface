import useLocaleTranslation from "@/hooks/useLocaleTranslation"
import styled from "styled-components"
import Image from 'next/image'

export default function AssetsActionBuyRunes() {
  const { t } = useLocaleTranslation()

  const ordens = [
    {
      quantity: '6,906.9',
      price: '12.420044',
      brlPrice: 'R$0,04164',
      totalBTC: '0.00085800',
      totalBRL: 'R$256,67',
      origin: 'http://localhost:3000/_next/static/media/bitcoin.59eba954.svg' 
    },
    {
      quantity: '1,000',
      price: '12.420044',
      brlPrice: 'R$0,04164',
      totalBTC: '0.00005800',
      totalBRL: 'R$46,67',
      origin: 'http://localhost:3000/_next/static/media/bitcoin.59eba954.svg' 
    },
    {
      quantity: '1,000',
      price: '12.420044',
      brlPrice: 'R$0,04164',
      totalBTC: '0.00005800',
      totalBRL: 'R$52,67',
      origin: 'http://localhost:3000/_next/static/media/bitcoin.59eba954.svg' 
    }
  ];


  return (
    <Container>
        <InputContainer >
          <span>{t('v3.assetDetail.quantity')}</span>
          <div>
            <AssetOriginal>
              <span>Balance 0.5 btc</span>
              <div>
                <Image src={`	http://localhost:3000/_next/static/media/bitcoin.59eba954.svg`} width={32} height={32} alt='BRL' />
                <span>BTC</span>
              </div>
            </AssetOriginal>
              <Input type='number' min={0} placeholder='0' step={1} />
          </div>
        </InputContainer>
        <InputContainer disabled>
          <span>{t('v3.assetDetail.quantity')}</span>
          <div>
            <AssetConverted>
              <Image src={`	http://localhost:3000/_next/static/media/bitcoin.59eba954.svg`} width={36} height={24} alt='BRL'/>
              <span>DOG</span>
            </AssetConverted>
            <Input type='number' min={0} placeholder='0' step={1} disabled/>
          </div>
      </InputContainer>
      <SelectedOrder>
        <h2>Ordens Selecionadas</h2>
        <ul>
          <div>
            <span>Quantidade:</span>
            <span>Preço {`(Sats/DOG)`}</span>
            <span>Total {`(BTC)`}</span>
            <span>Origem</span>
         </div>
          {ordens.map((ordem, index) => (
            <li key={index} style={{ listStyle: 'none', marginBottom: '10px' }}>
              <span>{ordem.quantity}</span>
              <div>
                <strong>{ordem.price}</strong>
                <span>{ordem.brlPrice}</span>
              </div>
              <div>
                <strong>{ordem.totalBTC}</strong>
                <span>{ordem.totalBRL}</span>
              </div>
              <img src={ordem.origin} alt="Ícone" width="20" height="20" style={{ marginLeft: '5px' }} />
            </li>
          ))}
        </ul>
      </SelectedOrder>
    </Container>
  )
}


const { Container, InputContainer, BoxValuesContainer, Input, AssetOriginal, AssetConverted, SelectedOrder } = {
  Container: styled.div`
    width: auto;
    color: ${({ theme }) => theme.colorV2.gray[1]};

    > header {
      font-size: ${({ theme }) => theme.font.size[13]};
      font-weight: 400;
    }

    display: grid;
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.size[24]};

    > footer {
      font-size: 13px;
      color: ${({ theme }) => theme.colorV2.gray[1]};
      opacity: 0.6;
      text-align: center;
    }
  `,
  BoxValuesContainer: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
    align-items: center;
  `,
  InputContainer: styled.div<{ disabled?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};
    width: 100%;

    > span {
      color: ${({ theme }) => theme.colorV2.gray[6]};
      font-size: ${({ theme }) => theme.font.size[13]};
      font-weight: 400;
    }

    > div {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: ${({ theme }) => theme.size[16]};

      border-radius: ${({ theme }) => theme.size[8]};
      padding: 12px 8px;
      border: 1px solid ${({ theme }) => theme.colorV2.gray[6]};
      background: ${({ theme }) => theme.colorV2.white};

      ${({ disabled, theme }) =>
      disabled &&
      `
            background: ${theme.colorV2.gray[2]};
            box-shadow: ${theme.shadow[100]};
            border: 1px solid transparent;
          `}

      font-weight: 500;

      &.error {
        border: 1px solid ${({ theme }) => theme.color.red[300]};
      }

      > div {
        font-size: ${({ theme }) => theme.font.size[15]};
        div {
           gap: 8px;
        }
        span:nth-child(1) {
         color: ${({ theme }) => theme.colorV2.gray[1]};
          font-size: ${({ theme }) => theme.font.size[13]};
          font-weight: 400;
        }
      }
    }
  `,
  Input: styled.input<{ disabled?: boolean }>`
    width: 50%;
    border-radius: 8px;
    background: transparent;
    border: 0;
    font-size: ${({ theme }) => theme.font.size[22]};
    font-weight: 500;
    color: ${({ theme }) => theme.colorV2.gray[1]};
    text-align: right;

    &:focus {
      outline: none;
    }
  `,
  AssetOriginal: styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.size[8]};
  div {
    display: flex;
    align-items: center;
  }
  `,
  AssetConverted: styled.div`
    display: flex;
    align-items: center;
  `,
  SelectedOrder: styled.div`
      display: flex;
      flex-direction: column;
      gap: 6px;
    h2 {
      color: ${({ theme }) => theme.colorV2.gray[1]};
      font-family: Montserrat;
      font-size: ${({ theme }) => theme.font.size[13]};
      font-weight: 500;
    }


   ul {
      display: grid;
      gap: 6px;

      div {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        white-space: nowrap;

        span:nth-last-child(-n+2) {
          text-align: right;
        }
        span {
          color: ${({ theme }) => theme.colorV2.gray[6]};
          font-family: Montserrat;
          font-size: 11px;
          font-weight: 400;
        }
      }
    }

    li {
      display: grid;
      grid-template-columns: repeat(5, auto);
      justify-content: space-between;
      text-align: right;
      align-content: center;
      span, strong {
        color: ${({ theme }) => theme.colorV2.gray[1]};
        font-size: ${({ theme }) => theme.font.size[13]};
        font-weight: 500;
        align-self: flex-start;
      }
      
      div {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
    }
  `,
}