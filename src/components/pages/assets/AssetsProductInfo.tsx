import SkeletonLoading from '@/components/shared/icons/SkeletonLoading'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { notification } from 'antd'
import { useRouter } from 'next/router'
import { PiShareNetwork } from 'react-icons/pi'
import styled from 'styled-components'
import AssetIcon from '../../shared/AssetIcon'
import NetworkIcons from '../../shared/NetworkIcons'
import PriceChart from '../../shared/PriceChart'
import { Asset } from '@/types/Asset'
import AssetPrice from '@/components/shared/AssetPrice'
import AssetsStatistic from './AssetsStatistic'

interface AssetsProductInfoProps {
  asset?: Asset
  assetId: string
  chainId: number
  assetIsLoading: boolean
}

export default function AssetsProductInfo({ asset, assetId, chainId, assetIsLoading }: AssetsProductInfoProps) {
  const { t } = useLocaleTranslation()

  const router = useRouter()
  const { locale } = router

  const { networks } = asset ?? { networks: [] }

  const copyToClipboard = async () => {
    const url = `${window.location.origin}${router.asPath}`

    await navigator.clipboard.writeText(url)

    notification.info({
      message: `${t('copyClipboard')}`,
      placement: 'topRight'
    })
  }

  return (
    <ProductContainer>
      <header>
        <HeaderProduct>
          <div>
            {assetIsLoading ? (
              <SkeletonLoading width={120} height={38} />
            ) : (
              <>
                <AssetIcon image={asset?.imageUrl} size={36} altName={asset?.name} chain={chainId} />
                {asset?.name}
              </>
            )}
            <ShareButton onClick={copyToClipboard}>
              <PiShareNetwork />
              <span>{t('share')}</span>
            </ShareButton>
          </div>
          <div>
            <span>{t('v2.ethereumStaking.networkAvailable')}</span>
            {assetIsLoading ? (
              <SkeletonLoading width={120} height={16} />
            ) : (
              <NetworksIconsContainer>
                {networks.map(network => (
                  <NetworkIcons network={network.name.toLocaleLowerCase()} size={16} key={network.chainId} />
                ))}
              </NetworksIconsContainer>
            )}
          </div>
        </HeaderProduct>

        <HeaderDescribeInfo>
          <SymbolContainer>
            <div>{assetIsLoading ? <SkeletonLoading width={30} height={15} /> : <span className='symbol'>{asset?.symbol}</span>}</div>
            <div>
              <AssetPrice chainId={chainId} contractAddress={assetId} className='price' />
            </div>
          </SymbolContainer>
        </HeaderDescribeInfo>
      </header>
      <PriceChart asset={asset} assetId={assetId} chainId={chainId} />
      <AssetsStatistic asset={asset} assetIsLoading={assetIsLoading} />
      <ProductBodyContainer>
        <h2>{t('v2.ethereumStaking.description')}</h2>
        {assetIsLoading ? <SkeletonLoading width={300} height={15} /> : <span>{asset?.description[(locale as 'en' | 'pt') ?? 'en']}</span>}
      </ProductBodyContainer>
    </ProductContainer>
  )
}

const { ProductContainer, NetworksIconsContainer, SymbolContainer, ProductBodyContainer, ShareButton, HeaderProduct, HeaderDescribeInfo } =
  {
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
    NetworksIconsContainer: styled.div`
      img + img {
        margin-left: -3px;
      }
    `,
    HeaderProduct: styled.div`
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: ${({ theme }) => theme.size[8]};

      > div {
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
