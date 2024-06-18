import SkeletonLoading from '@/components/shared/icons/SkeletonLoading'
import { chainConfigByChainId } from '@/config/chain'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { capitalize } from '@/services/truncate'
import { Asset } from '@/types/Asset'
import { notification } from 'antd'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { PiShareNetwork } from 'react-icons/pi'
import styled from 'styled-components'
import AssetIcon from '../shared/AssetIcon'
import NetworkIcons from '../shared/NetworkIcons'
import PriceChart from '../shared/PriceChart'

interface AssetsProductInfoProps {
  asset: Asset
}

const AssetPrice = dynamic(() => import('../shared/AssetPrice'), {
  ssr: false,
  loading: () => <SkeletonLoading width={80} />,
  suspense: true
})

const AssetsStatistic = dynamic(() => import('./AssetsStatistic'), {
  ssr: false,
  loading: () => <SkeletonLoading width={80} />,
  suspense: true
})

export default function AssetsProductInfo({ asset }: AssetsProductInfoProps) {
  const { t } = useLocaleTranslation()



  const router = useRouter()
  const config = chainConfigByChainId(asset.chains[0])

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
            <AssetIcon image={asset.symbolImage} size={36} altName={asset.id} chain={asset.chains[0]} />
            {t(`v2.products.${asset.id}`)}
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
              <span className='symbol'>{asset.symbol}</span>
            </div>
            <div>
              <AssetPrice asset={asset} className='price' />
            </div>
          </SymbolContainer>
        </HeaderDescribeInfo>
      </header>
      <PriceChart asset={asset} />
      <AssetsStatistic asset={asset} />
      <ProductBodyContainer>
        <h2>{t('v2.ethereumStaking.description')}</h2>
        <span>{t(`v2.ethereumStaking.${asset.localeDescription}`)}</span>
      </ProductBodyContainer>
    </ProductContainer>
  )
}

const { ProductContainer, SymbolContainer, ProductBodyContainer, ShareButton, HeaderProduct, HeaderDescribeInfo } = {
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
