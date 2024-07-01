import useLocaleTranslation from "@/hooks/useLocaleTranslation"
import styled from "styled-components"
import Image from 'next/image'
import Button from '@/components/shared/Button'
import { PiArrowRight } from "react-icons/pi"
import AssetsNetworkSwitch, { Network } from "./AssetsNetworkSwitch"
import { Asset } from "@/types/Asset"
import { useCallback, useState } from "react"
import { useRouter } from "next/router"

interface AssetsActionRunesProps {
  asset?: Asset
  chainId: number
}

export default function AssetsActionBuyRunes({ asset, chainId }: AssetsActionRunesProps) {
  const [balanceValue, setBalanceValue] = useState("")
  
  const { t } = useLocaleTranslation()
  const nextBtnMessage = t("next")
  const router = useRouter()

  const selectedOrders = [
    {
      quantity: '6,906.9',
      price: '12.420044',
      brlPrice: 'R$0,04164',
      totalBTC: 0.00085800,
      totalBRL: 'R$256,67',
      origin: 'http://localhost:3000/_next/static/media/bitcoin.59eba954.svg' 
    },
    {
      quantity: '1,000',
      price: '12.420044',
      brlPrice: 'R$0,04164',
      totalBTC: 0.00005800,
      totalBRL: 'R$46,67',
      origin: 'http://localhost:3000/_next/static/media/bitcoin.59eba954.svg' 
    },
    {
      quantity: '1,000',
      price: '12.420044',
      brlPrice: 'R$0,04164',
      totalBTC: 0.00005800,
      totalBRL: 'R$52,67',
      origin: 'http://localhost:3000/_next/static/media/bitcoin.59eba954.svg' 
    }
  ];

  const filteredList = selectedOrders.filter(order => order.totalBTC <= Number(balanceValue))

  const onNetworkChange = useCallback(
    (network: Network) => {
      router.query.network = network.name.toLowerCase()
      router.query.product = network.contractAddress
      router.push(router)
    },
    [router]
  )

  return (
    <Container>
      <AssetsNetworkSwitch title={"Rede de recebimento"} networks={asset?.networks ?? []} chainId={chainId} onChange={onNetworkChange} />
        <InputContainer >
          <span>{t('v3.assetDetail.quantity')}</span>
          <div>
            <AssetOriginal>
            <span>{t('actionBuyRunes.balance')} 0.5 btc</span>
              <div>
                <Image src={`http://localhost:3000/_next/static/media/bitcoin.59eba954.svg`} width={32} height={32} alt='BRL' />
                <span>BTC</span>
              </div>
            </AssetOriginal>
          <Input type='number' min={0} placeholder='0' step={1} onChange={(e) => setBalanceValue(e.target.value)}/>
          </div>
        </InputContainer>
        <InputContainer disabled>
          <span>{t('v3.assetDetail.quantity')}</span>
          <div>
            <AssetConverted>
              <Image src={`http://localhost:3000/_next/static/media/bitcoin.59eba954.svg`} width={36} height={24} alt='BRL'/>
              <span>DOG</span>
            </AssetConverted>
            <Input type='number' min={0} placeholder='0' step={1} disabled/>
          </div>
      </InputContainer>
      <SelectedOrder>
        <h2>{t('actionBuyRunes.orders.selectedOrders')}</h2>
        <ul>
          <div>
            <span>{t('v3.assetDetail.quantity')}</span>
            <span>{t('actionBuyRunes.orders.price')} {`(Sats/DOG)`}</span>
            <span>{t('actionBuyRunes.orders.total')} {`(BTC)`}</span>
            <span>{t('actionBuyRunes.orders.origin')}</span>
         </div>
          {filteredList.map((order, index) => (
            <li key={index}>
                <span>{order.quantity}</span>
                <div>
                  <strong>{order.price}</strong>
                  <span>{order.brlPrice}</span>
                </div>
                <div>
                  <strong>{order.totalBTC.toString()}</strong>
                  <span>{order.totalBRL}</span>
              </div>
              <Image src={order.origin} width={20} height={20} alt={""} />
            </li>
          ))}
        </ul>
      </SelectedOrder>
      <AveragePrice>
        <div>
          <span>{t('actionBuyRunes.averageBestPrice')}</span>
          <span>12.420044 SATS / R$0,04164</span>
        </div>
        
        <div>
          <div>
            <span>{t('actionBuyRunes.networkTax')}</span>
            <span>{t('v3.assetDetail.quantity')}</span>
          </div>
          <div>
            <span>0.00036000 BTC / R$134,43</span>
            <span>0.00091800 BTC / R$468,43</span>
          </div>
        </div>
      </AveragePrice>
      <Button label={nextBtnMessage} icon={<PiArrowRight />}/>
    </Container>
  )
}


const { Container, InputContainer, Input, AssetOriginal, AssetConverted, SelectedOrder, AveragePrice } = {
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
      gap: 10px;
      border-top: 2px solid ${({ theme }) => theme.colorV2.gray[6]};
      border-bottom: 2px solid ${({ theme }) => theme.colorV2.gray[6]};
      padding: 16px 0 16px 0;

    h2 {
      color: ${({ theme }) => theme.colorV2.gray[1]};
      font-family: Montserrat;
      font-size: ${({ theme }) => theme.font.size[13]};
      font-weight: 500;
    }

   ul {
      display: grid;
      gap: 12px;
      height: auto;
      max-height: 219px;
      overflow: auto;

     > div {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        white-space: nowrap;
        gap: ${({ theme }) => theme.size[8]};

        span:nth-last-child(2) {
          text-align: center;
        }
        span:nth-last-child(-n+1) {
          text-align: right;
        }
        span {
          color: ${({ theme }) => theme.colorV2.gray[6]};
          font-size: 11px;
          font-weight: 400;
        }
      }
    }

    li {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      padding: ${({ theme }) => theme.size[4]};
      
      span, strong {
        color: ${({ theme }) => theme.colorV2.gray[1]};
        font-size: ${({ theme }) => theme.font.size[13]};
        font-weight: 500;
        align-self: flex-start;
      }

      span:nth-child(2) {
          color: ${({ theme }) => theme.colorV2.gray[6]};
          font-size: ${({ theme }) => theme.font.size[13]};
          font-weight: 400;
      }
      
        div {
          display: grid;
          grid-template-columns: 1fr;
          align-items: center;
          gap: 3px;
        }
        div:nth-child(3),img {
          justify-self: flex-end;
        }
      }
  `,
  AveragePrice: styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.size[8]};

  >div:nth-child(1) {
    display: flex;
    justify-content: space-between;

    span {
      font-size: ${({ theme }) => theme.font.size[13]};
      font-weight: 500;
      color: ${({ theme }) => theme.color.green[400]};
    }
  }

  div:nth-child(2) {
    display: flex;
    justify-content: space-between;

    div:nth-child(1) {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[8]};
    }
     div {
      flex-direction: column;
      ${({ theme }) => theme.size[8]}
    }
     span {
      font-size: ${({ theme }) => theme.font.size[13]};
      font-weight: 500;
      color: ${({ theme }) => theme.color.gray[400]};
    }
  }
  `
}