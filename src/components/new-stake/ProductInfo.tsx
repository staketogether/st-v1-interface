import { Product } from '@/types/Product'
import React from 'react'
import { PiArrowLeft, PiCopy } from 'react-icons/pi'
import styled from 'styled-components'
import StakingIcons from '../tokens/StakingIcons'
import SymbolIcons from '../tokens/SymbolIcons'
import chainConfig from '@/config/chain'
import { truncateAddress } from '@/services/truncate'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import EthereumLineChart from './ethereum/EthereumLineChart'
import axios from 'axios'
import useSWR from 'swr'
import { globalConfig } from '@/config/global'
import { useRouter } from 'next/router'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import Link from 'next/link'
import useCoinUsdToUserCurrency from '@/hooks/useCoinUsdToUserCurrency'

type ProductInfoProps = {
  product: Product
}

export type MarketAssetData = {
  data: {
    ath: number
    atl: number
    is_listed: boolean
    liquidity: number
    liquidity_change_24h: number
    market_cap: number
    market_cap_diluted: number
    off_chain_volume: number
    price: number
    price_change_1h: number
    price_change_1m: number
    price_change_1y: number
    price_change_24h: number
    price_change_7d: number
    volume: number
    volume_7d: number
    volume_change_24h: number
  }
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { contracts } = chainConfig()
  const { t } = useLocaleTranslation()
  const { query } = useRouter()
  const { currency, network } = query

  const { handleQuotePrice } = useCoinUsdToUserCurrency()
  const getTimestamps = (): { currentTimestamp: number; pastTimestamp: number } => {
    const currentDate = new Date()

    const currentTimestamp = currentDate.getTime()
    const subtract7Days = currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
    const pastDate = new Date(subtract7Days)
    const pastTimestamp = pastDate.getTime()

    return { currentTimestamp, pastTimestamp }
  }
  const { currentTimestamp, pastTimestamp } = getTimestamps()

  const { backendUrl } = globalConfig
  const fetcher = (uri: string) =>
    axios
      .get(`${backendUrl}/api/${uri}`, {
        params: {
          from: pastTimestamp,
          to: currentTimestamp
        }
      })
      .then(res => res.data)
  const { data, isLoading: dataChartLoading } = useSWR<{ price_history: [number, number][] }>(
    `mobula/market-history`,
    fetcher
  )

  const chartDataMapped =
    data?.price_history &&
    data?.price_history.length &&
    data?.price_history.map(([timestamp, price]) => [timestamp, price])

  const fetcherMarketAssetData = (uri: string) =>
    axios
      .get(`${backendUrl}/api/${uri}`, {
        params: {
          asset: 'Ethereum',
          blockchain: 'ethereum',
          symbol: 'eth'
        }
      })
      .then(res => res.data)
  const { data: assetData, isLoading } = useSWR<MarketAssetData>(
    `mobula/market-asset-data`,
    fetcherMarketAssetData
  )

  return (
    <ProductContainer>
      <header>
        <HeaderBackAction href={`/${network}/${currency}/product`}>
          <PiArrowLeft />
          <span>{t('goToBack')}</span>
        </HeaderBackAction>

        <HeaderProduct>
          <StakingIcons stakingProduct={product.icon} size={36} />
          {product.title}
        </HeaderProduct>

        <HeaderDescribeInfo>
          <div>
            <SymbolIcons productSymbol={product.symbol} size={24} />
            <span className='symbol'>{product.symbol}</span>
          </div>
          <div>
            {isLoading ? (
              <SkeletonLoading width={120} />
            ) : (
              <span className='CoinValue'>{`${handleQuotePrice(assetData?.data?.price || 0)}
               `}</span>
            )}
            <span className='apy'>{`APY:${product.apy}%`}</span>
          </div>
        </HeaderDescribeInfo>
      </header>
      {chartDataMapped && !dataChartLoading ? (
        <EthereumLineChart data={chartDataMapped} />
      ) : (
        <SkeletonLoading height={327} />
      )}
      <ProductBodyContainer>
        <h2>{t('v2.ethereumStaking.statistics')}</h2>
        <StatisticContainer>
          <div>
            <span>{t('v2.ethereumStaking.marketCap')}</span>
            {isLoading ? (
              <SkeletonLoading width={120} />
            ) : (
              <span className='valueItem'>{`${handleQuotePrice(assetData?.data?.market_cap || 0)}`}</span>
            )}
          </div>
          <div>
            <span>Volume</span>
            {isLoading ? (
              <SkeletonLoading width={120} />
            ) : (
              <span className='valueItem'>{`${handleQuotePrice(assetData?.data?.volume || 0)}`}</span>
            )}
          </div>
          <div>
            <span>{t('v2.ethereumStaking.priceChange')}</span>
            {isLoading ? (
              <SkeletonLoading width={120} />
            ) : (
              <span className='valueItem'>{`${assetData?.data?.price_change_1y.toFixed(2)}%`}</span>
            )}
          </div>
        </StatisticContainer>
      </ProductBodyContainer>
      <ProductBodyContainer>
        <h2>{t('v2.ethereumStaking.description')}</h2>
        <span>{t(`v2.ethereumStaking.${product.description}`)}</span>
      </ProductBodyContainer>

      <ProductBodyContainer>
        <h2>{t('v2.ethereumStaking.contractAddress')}</h2>
        <span className='copy'>
          {truncateAddress(contracts.StakeTogether)} <PiCopy style={{ fontSize: 16 }} />
        </span>
      </ProductBodyContainer>
    </ProductContainer>
  )
}

const {
  ProductContainer,
  ProductBodyContainer,
  HeaderBackAction,
  HeaderProduct,
  HeaderDescribeInfo,
  StatisticContainer
} = {
  ProductContainer: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};

    header {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[12]};
    }
  `,
  HeaderBackAction: styled(Link)`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[4]};
    font-size: ${({ theme }) => theme.font.size[15]};

    color: ${({ theme }) => theme.colorV2.gray[1]};
    opacity: 0.6;
    cursor: pointer;
  `,
  HeaderProduct: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};

    font-size: ${({ theme }) => theme.font.size[22]};
    font-style: normal;
    font-weight: 500;
  `,
  HeaderDescribeInfo: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[16]};
    div {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[8]};

      span {
        &.symbol {
          font-size: ${({ theme }) => theme.font.size[15]};
          font-weight: 400;
        }
        &.CoinValue {
          color: ${({ theme }) => theme.colorV2.blue[1]};
          font-size: ${({ theme }) => theme.font.size[22]};
          font-weight: 500;
        }
        &.apy {
          color: ${({ theme }) => theme.color.green[500]};
          font-size: ${({ theme }) => theme.font.size[13]};
          font-weight: 500;
        }
      }
    }
  `,
  ProductBodyContainer: styled.section`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};

    > h2 {
      color: ${({ theme }) => theme.colorV2.blue[1]};
      font-size: ${({ theme }) => theme.font.size[15]};
      font-weight: 500;
    }

    span {
      font-size: 13px;
      font-weight: 400;
      color: ${({ theme }) => theme.colorV2.gray[1]};
      opacity: 0.8;

      &.valueItem {
        font-size: 20px;
        color: ${({ theme }) => theme.colorV2.gray[1]};
        opacity: 1;
      }

      &.copy {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.size[4]};
        cursor: pointer;
        img {
          margin-top: 1px;
        }
      }
    }
  `,
  StatisticContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }

    div {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[8]};
    }
  `
}
