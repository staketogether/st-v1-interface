import TokensSymbolIcons from '@/components/shared/TokensSymbolIcons'
import { chainConfigByChainId } from '@/config/chain'
import useCoinUsdToUserCurrency from '@/hooks/useCoinUsdToUserCurrency'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { capitalize, truncateWei } from '@/services/truncate'
import { Asset } from '@/types/Asset'
import { Staking } from '@/types/Staking'
import { Tooltip, notification } from 'antd'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { PiArrowUpRight, PiShareNetwork } from 'react-icons/pi'
import styled from 'styled-components'
import AssetIcon from '../shared/AssetIcon'
import NetworkIcons from '../shared/NetworkIcons'
import PriceChart from '../shared/PriceChart'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import { useAccount } from 'wagmi'
import useAccountStPoints from '@/hooks/subgraphs/useAccountStPoints'
import useAccountElPoints from '@/hooks/subgraphs/useAcountElPoints'

interface ProductInfoProps {
  product: Staking
  assetData: Asset
  chainId: number
}

const TokensShowValuePrice = dynamic(() => import('../shared/AssetPrice'), {
  ssr: false,
  loading: () => <SkeletonLoading width={80} />,
  suspense: true
})

export default function ProductInfo({ product, assetData, chainId }: ProductInfoProps) {
  const config = chainConfigByChainId(chainId)
  const { t } = useLocaleTranslation()

  const { address } = useAccount()
  const { points } = useAccountStPoints(address)
  const { elPoints } = useAccountElPoints(address)
  const formattedPoints = truncateWei(BigInt(elPoints))
  const formattedStPoints = truncateWei(BigInt(points))

  const { handleQuotePrice } = useCoinUsdToUserCurrency()
  const stakeTogetherContractAddress = product.contracts.StakeTogether
  const router = useRouter()

  const copyToClipboard = async () => {
    const url = `${window.location.origin}${router.asPath}`

    await navigator.clipboard.writeText(url)

    notification.info({
      message: `${t('copyClipboard')}`,
      placement: 'topRight'
    })
  }

  const formattedStakingAsset: Asset = {
    description: { en: '', pt: '' },
    priceChange24h: 0,
    priceChangePercentage1Y: 0,
    priceChangePercentage24h: 0,
    ref: '',
    type: 'erc20',
    networks: [
      {
        chainId,
        contractAddress: product.contracts.StakeTogether,
        name: product.asset.name
      }
    ],
    symbol: product.symbol,
    imageUrl: product.symbolImage,
    name: product.asset.name,
    isFanToken: false,
    decimals: product.asset.decimals,
    marketCap: 0,
    totalVolume: 0,
    totalSupply: 0
  }

  const formattedProductId = product.asset.type === 'bitcoin' ? product.asset.symbol : product.asset.contractAddress

  return (
    <ProductContainer>
      <header>
        <HeaderProduct>
          <div>
            <AssetIcon image={product.logoImage} size={36} altName={product.id} chain={chainId} />
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
              <TokensSymbolIcons
                image={product.symbolImage}
                size={23}
                contractAddress={stakeTogetherContractAddress}
                tokenForAddWallet={{
                  contractAddress: stakeTogetherContractAddress,
                  symbol: product.symbol,
                  decimals: 18,
                  image: product.symbolImage
                }}
                altName={''}
              />
              <span className='symbol'>{product.symbol}</span>
            </div>
            <div>
              <TokensShowValuePrice chainId={chainId} contractAddress={formattedProductId} className='CoinValue' />
              <span className='apy'>{`APY ${product.apy}%`}</span>
            </div>
          </SymbolContainer>
          <RewardsPointsContainer>
            <span>{t('v2.ethereumStaking.myRewardsPoints')}</span>

            {product.points.elPoints && (
              <Tooltip title={t('v2.ethereumStaking.eigenPointTooltip')}>
                <TagPointsContainer>
                  Eigen
                  <div>{formattedPoints}</div>
                </TagPointsContainer>
              </Tooltip>
            )}
            {product.points.stPoints && (
              <Tooltip title={t('v2.ethereumStaking.togetherPoints')}>
                <TagPointsContainer className='purple'>
                  Together
                  <div>{formattedStPoints}</div>
                </TagPointsContainer>
              </Tooltip>
            )}
          </RewardsPointsContainer>
        </HeaderDescribeInfo>
      </header>
      <PriceChart
        asset={formattedStakingAsset}
        assetId={product.asset.type === 'bitcoin' ? product.asset.symbol : product.asset.contractAddress}
        chainId={chainId}
      />
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

      <ProductBodyContainer>
        <h2>{t('v2.ethereumStaking.contractAddress')}</h2>
        <a className='copy' href={`${config.blockExplorer.baseUrl}/address/${stakeTogetherContractAddress}`} target='_blank'>
          {stakeTogetherContractAddress} <PiArrowUpRight style={{ fontSize: 16 }} />
        </a>
      </ProductBodyContainer>
    </ProductContainer>
  )
}

const {
  ProductContainer,
  SymbolContainer,
  ProductBodyContainer,
  TagPointsContainer,
  ShareButton,
  HeaderProduct,
  HeaderDescribeInfo,
  RewardsPointsContainer,
  StatisticContainer
} = {
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
        gap: ${({ theme }) => theme.size[12]};
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
      gap: ${({ theme }) => theme.size[8]};

      &:nth-child(1) {
        font-size: ${({ theme }) => theme.font.size[22]};
        font-style: normal;
        font-weight: 500;
      }

      &:nth-child(2) {
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
  RewardsPointsContainer: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[12]};

    > span {
      color: ${({ theme }) => theme.colorV2.gray[1]};
      opacity: 0.6;
      font-size: ${({ theme }) => theme.font.size[13]};
      font-weight: 500;

      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[4]};
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
  TagPointsContainer: styled.div`
    height: 20px;
    padding: 0px 2px 0px 12px;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};

    font-size: ${({ theme }) => theme.font.size[13]};
    font-weight: 500;
    color: ${({ theme }) => theme.colorV2.white};
    background: #5c626b;
    border-radius: 99px;

    &.purple {
      background: ${({ theme }) => theme.colorV2.purple[1]};
    }

    > div {
      height: 16px;
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[8]};
      padding: 0px 6px;
      color: ${({ theme }) => theme.colorV2.white};
      border-radius: 99px;
      background: ${({ theme }) => theme.colorV2.gray[1]};
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
