import TokensSymbolIcons from '@/components/asset/TokensSymbolIcons'
import { chainConfigByChainId } from '@/config/chain'
import useCoinUsdToUserCurrency from '@/hooks/useCoinUsdToUserCurrency'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { capitalize } from '@/services/truncate'
import { Asset } from '@/types/Asset'
import { AssetStats } from '@/types/AssetStats'
import { notification } from 'antd'
import { useRouter } from 'next/router'
import { PiShareNetwork } from 'react-icons/pi'
import styled from 'styled-components'
import AssetIcon from '../shared/AssetIcon'
import NetworkIcons from '../shared/NetworkIcons'
import PriceChart from '../shared/PriceChart'
import useQuoteBrla from '@/hooks/ramp/useQuote'
import { ProviderType } from '@/types/provider.type'
import { PaymentMethodType } from '@/types/payment-method.type'
import useFiatUsdConversion from '@/hooks/useFiatUsdConversion'
import SkeletonLoading from '@/components/shared/icons/SkeletonLoading'

interface AssetsProductInfoProps {
  product: Asset
  assetData: AssetStats
}

export default function AssetsProductInfo({ product, assetData }: AssetsProductInfoProps) {
  const amountToQuote = product.ramp[0].minDeposit

  const { t } = useLocaleTranslation()

  const { handleQuotePrice } = useCoinUsdToUserCurrency()
  const { usdToCurrency, currencyToUsd } = useFiatUsdConversion()
  const router = useRouter()
  const config = chainConfigByChainId(product.chains[0])

  const copyToClipboard = async () => {
    const url = `${window.location.origin}${router.asPath}`

    await navigator.clipboard.writeText(url)

    notification.info({
      message: `${t('copyClipboard')}`,
      placement: 'topRight'
    })
  }

  const { quote: quotedAmount, isLoading: loadingQuotedAmount } = useQuoteBrla(
    'brl',
    amountToQuote,
    product.ramp[0].bridge?.fromChainId ?? product.ramp[0].chainId,
    product.type === 'fan-token',
    ProviderType.brla,
    PaymentMethodType.pix,
    product.ramp[0].bridge?.toChainId.toString(),
    product.ramp[0].bridge?.toToken ?? product.symbol,
    true,
    5 * 1000
  )

  const quotedBrlAmount = Number(quotedAmount?.amountBrl ?? 0) / Number(quotedAmount?.amountToken ?? 0)
  const quotedUsdAmount = currencyToUsd(quotedBrlAmount, 'BRL')
  const quotedFiatAmount = usdToCurrency(quotedUsdAmount.raw)

  return (
    <ProductContainer>
      <header>
        <HeaderProduct>
          <div>
            <AssetIcon image={product.symbolImage} size={36} altName={product.id} chain={product.chains[0]} />
            {t(`v2.products.${product.id}`)}
            <ShareButton onClick={copyToClipboard}>
              <PiShareNetwork />
              <span>{t('share')}</span>
            </ShareButton>
          </div>
          <div>
            <span>{t('v2.ethereumStaking.networkAvailable')}</span>
            <NetworkIcons network={config.name.toLowerCase()} size={16} />
            <span>{capitalize(config.name.toLowerCase().replaceAll('-', ' '))}</span>
          </div>
        </HeaderProduct>

        <HeaderDescribeInfo>
          <SymbolContainer>
            <div>
              <TokensSymbolIcons productSymbol={product.symbol} size={23} />
              <span className='symbol'>{product.symbol}</span>
            </div>
            <div>
              {loadingQuotedAmount ? (
                <SkeletonLoading width={66} height={22} />
              ) : (
                <span className='price'>{`${quotedFiatAmount.formatted}`}</span>
              )}
            </div>
          </SymbolContainer>
        </HeaderDescribeInfo>
      </header>
      <PriceChart asset={product} />
      <ProductBodyContainer>
        <h2>{t('v2.ethereumStaking.statistics')}</h2>
        <StatisticContainer>
          <div>
            <span>{t('v2.ethereumStaking.marketCap')}</span>
            <span className='valueItem'>{`${handleQuotePrice(assetData?.marketCap || 0)}`}</span>
          </div>
          <div>
            <span>Volume</span>
            <span className='valueItem'>{`${handleQuotePrice(assetData?.totalVolume || 0)}`}</span>
          </div>
          <div>
            <span>{t('v2.ethereumStaking.priceChange')}</span>
            <span className='valueItem'>{`${assetData?.priceChangePercentage1Y?.toFixed(2)}%`}</span>
          </div>
        </StatisticContainer>
      </ProductBodyContainer>
      <ProductBodyContainer>
        <h2>{t('v2.ethereumStaking.description')}</h2>
        <span>{t(`v2.ethereumStaking.${product.localeDescription}`)}</span>
      </ProductBodyContainer>
    </ProductContainer>
  )
}

const { ProductContainer, SymbolContainer, ProductBodyContainer, ShareButton, HeaderProduct, HeaderDescribeInfo, StatisticContainer } = {
  ProductContainer: styled.div`
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};

    > header {
      display: none;

      @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
        display: flex;
        flex-direction: column;
        gap: ${({ theme }) => theme.size[16]};
      }
    }
  `,

  HeaderProduct: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.size[8]};

    div {
      display: flex;
      align-items: center;

      &:nth-child(1) {
        font-size: ${({ theme }) => theme.font.size[22]};
        font-style: normal;
        font-weight: 500;
        gap: ${({ theme }) => theme.size[12]};
      }

      &:nth-child(2) {
        gap: ${({ theme }) => theme.size[4]};

        span {
          font-size: ${({ theme }) => theme.font.size[13]};
          font-style: normal;
          font-weight: 500;
          opacity: 0.6;
        }
      }
    }
  `,
  HeaderDescribeInfo: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.size[16]};
  `,
  SymbolContainer: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};

    div {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[8]};

      span {
        &.symbol {
          font-size: ${({ theme }) => theme.font.size[15]};
          font-weight: 400;
        }

        &.price {
          color: ${({ theme }) => theme.colorV2.blue[1]};
          font-size: ${({ theme }) => theme.font.size[22]};
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
      line-height: 18px;
      font-weight: 500;
    }

    a,
    span {
      font-size: 13px;
      font-weight: 400;
      color: ${({ theme }) => theme.colorV2.gray[1]};
      opacity: 0.8;
      line-height: 1.5rem;

      &.valueItem {
        font-size: 16px;
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

    a:hover {
      color: ${({ theme }) => theme.colorV2.purple[1]};
    }
  `,
  StatisticContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }

    div {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[8]};
    }
  `,

  ShareButton: styled.div`
    height: 24px;
    background: ${({ theme }) => theme.colorV2.white};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[4]};
    padding: 0px 8px;
    cursor: pointer;
    border-radius: ${({ theme }) => theme.size[8]};

    box-shadow: ${({ theme }) => theme.shadow[100]};

    color: ${({ theme }) => theme.colorV2.purple[1]};
    font-weight: 400;
    font-size: ${({ theme }) => theme.font.size[13]};

    svg {
      color: ${({ theme }) => theme.colorV2.purple[1]};
    }
  `
}
