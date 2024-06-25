import AssetIcon from '@/components/shared/AssetIcon'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { AssetData } from '@/types/NewAsset'
import Link from 'next/link'
import styled from 'styled-components'
import useFiatUsdConversion from '@/hooks/useFiatUsdConversion'
import { toHumanFormat } from '@/services/format'
import Button from '../../shared/Button'
import { useRouter } from 'next/router'
import { Tooltip } from 'antd'

interface AssetCardProps {
  asset: AssetData
  chainId: number
}

export default function CryptoAssetTableRow({ asset, chainId }: AssetCardProps) {
  const network = asset.networks.find(item => item.chainId === chainId) ?? asset.networks[0]
  const contractAddress = asset.networks.find(item => item.chainId === chainId)?.contractAddress
  const signalPercentChange24h = asset.priceChangePercentage24h > 0 ? '+' : ''
  const { query } = useRouter()
  const { currency } = query
  const { usdToCurrency } = useFiatUsdConversion()
  const { t } = useLocaleTranslation()
  const isSimplified = !!process.env.NEXT_PUBLIC_SIMPLIFIED

  if (chainId === 500 && isSimplified) {
    return (
      <UnlinkedCardContainer>
        <ImageContainer>
          <div>
            <AssetIcon image={asset.imageUrl} chain={network.chainId} size={24} altName={network.name} />
            <span>{asset.name}</span>
          </div>
        </ImageContainer>
        <PriceContainer className='price'>{usdToCurrency(asset.currentPriceUsd).formatted}</PriceContainer>
        <PriceContainer className={asset.priceChangePercentage24h > 0 ? 'price-up' : 'price-down'}>
          {`${signalPercentChange24h}${asset.priceChangePercentage24h.toFixed(2)}%`}
        </PriceContainer>
        <PriceContainer className='price'>{toHumanFormat(usdToCurrency(asset.marketCap).raw)}</PriceContainer>
        <Tooltip title={t('soon')}>
          <Button label={t('buy')} small disabled />
        </Tooltip>
      </UnlinkedCardContainer>
    )
  }

  return (
    <CardContainer
      href={ {
        pathname: `/[currency]/[network]/product/assets/[product]`,
        query: {
          currency,
          network: network.name.toLowerCase(),
          product: contractAddress
        }
      }}
    >
      <ImageContainer>
        <div>
          <AssetIcon image={asset.imageUrl} chain={network.chainId} size={24} altName={network.name} />
          <span>{asset.name}</span>
        </div>
      </ImageContainer>
      <PriceContainer className='price'>{usdToCurrency(asset.currentPriceUsd).formatted}</PriceContainer>
      <PriceContainer className={asset.priceChangePercentage24h > 0 ? 'price-up' : 'price-down'}>
        {`${signalPercentChange24h}${asset.priceChangePercentage24h.toFixed(2)}%`}
      </PriceContainer>
      <PriceContainer className='price'>{toHumanFormat(usdToCurrency(asset.marketCap).raw)}</PriceContainer>
      <Button label={t('buy')} small />
    </CardContainer>
  )
}

const { CardContainer, ImageContainer, UnlinkedCardContainer, PriceContainer } = {
  UnlinkedCardContainer: styled.a`
      display: grid;
      grid-template-columns: 3fr 1fr 1fr 2fr 1fr;
      align-items: center;
      width: 100%;
      padding: 12px 16px;
      gap: 0;

      border: 1px solid transparent;
      transition:
              border 0.3s ease,
              color 0.3s ease;

      border-bottom: 1px solid ${({ theme }) => theme.colorV2.background};
      &:last-child {
          border-bottom: none;
          border-radius: 0 0 8px 8px;
      }

      &:hover {
          border: 1px solid ${({ theme }) => theme.colorV2.purple[1]};

          > div:first-child > div > span {
              color: ${({ theme }) => theme.colorV2.purple[1]};
          }
      }

      &.disabled {
          opacity: 0.6;
      }
  `,
  CardContainer: styled(Link)`
    display: grid;
    grid-template-columns: 3fr 1fr 1fr 2fr 1fr;
    align-items: center;
    width: 100%;
    padding: 12px 16px;
    gap: 0;

    border: 1px solid transparent;
    transition:
      border 0.3s ease,
      color 0.3s ease;

    border-bottom: 1px solid ${({ theme }) => theme.colorV2.background};
    &:last-child {
      border-bottom: none;
      border-radius: 0 0 8px 8px;
    }

    &:hover {
      border: 1px solid ${({ theme }) => theme.colorV2.purple[1]};

      > div:first-child > div > span {
        color: ${({ theme }) => theme.colorV2.purple[1]};
      }
    }

    &.disabled {
      opacity: 0.6;
    }
  `,
  PriceContainer: styled.span`
    color: ${({ theme }) => theme.colorV2.blue[1]};
    font-size: ${({ theme }) => theme.font.size[13]};
    font-weight: 500;
    border-radius: ${({ theme }) => theme.size[8]};
    white-space: nowrap;

    &.price {
      font-weight: 600;
      line-height: normal;
      padding-top: 2px;
    }

    &.price-up {
      font-weight: 600;
      color: ${({ theme }) => theme.color.green[500]};
      border-radius: 4px;
      min-width: 70px;
    }

    &.price-down {
      font-weight: 600;
      color: ${({ theme }) => theme.color.red[500]};
      border-radius: 4px;
      min-width: 70px;
    }
  `,

  ImageContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${({ theme }) => theme.size[12]};
    > div {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[16]};

      > span {
        color: ${({ theme }) => theme.colorV2.black};
        font-size: ${({ theme }) => theme.font.size[16]};
        font-weight: 500;
      }
    }
  `
}
