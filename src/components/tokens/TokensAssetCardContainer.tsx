import AssetIcon from '@/components/shared/AssetIcon'
import SkeletonLoading from '@/components/shared/icons/SkeletonLoading'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { ProductAsset } from '@/types/ProductAsset'
import { ProductStaking } from '@/types/ProductStaking'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

interface TokensAssetCardContainerProps {
  product: ProductStaking | ProductAsset
  type: 'staking' | 'assets'
}

const TokensShowValuePrice = dynamic(() => import('../shared/StakingShowValuePrice'), {
  ssr: false,
  loading: () => <SkeletonLoading width={80} />,
  suspense: true
})

export default function TokensAssetCardContainer({ product, type }: TokensAssetCardContainerProps) {
  const { t } = useLocaleTranslation()
  const { query } = useRouter()
  const { currency } = query as { currency: string }

  return (
    <CardContainer
      href={product.urlRedirect.replace('currency', currency)}
      className={`${!product.enabled && 'disabled'}`}
      style={{
        pointerEvents: !product.enabled ? 'none' : undefined
      }}
    >
      <ImageContainer>
        <div>
          {type === 'staking' ? (
            <AssetIcon assetIcon={product.name} networkIcon={product.networkAvailable} size={32} />
          ) : (
            <AssetIcon assetIcon={product.symbol} networkIcon={product.networkAvailable} size={32} />
          )}

          <span>{t(`v2.products.${product.name}`)}</span>
        </div>
        {!product.enabled && <Soon>{t('soon')}</Soon>}
        {product.newProductTag && <NewTag>{t('new')}</NewTag>}
      </ImageContainer>
      <TokensShowValuePrice product={product as ProductStaking} type={type} />
    </CardContainer>
  )
}

const { CardContainer, ImageContainer, Soon, NewTag } = {
  CardContainer: styled(Link)`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 24px;
    gap: 24px;
    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.colorV2.white};
    box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.2);
    border: 1px solid transparent;
    transition:
      border 0.3s ease,
      color 0.3s ease;

    > span {
      font-size: 22px;
      font-style: normal;
      font-weight: 500;
    }

    &:hover {
      border: 1px solid ${({ theme }) => theme.colorV2.purple[1]};

      * {
        color: ${({ theme }) => theme.colorV2.purple[1]};
      }
    }

    &.disabled {
      opacity: 0.6;
    }
  `,
  ImageContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
    > div {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[12]};
      > span {
        color: ${({ theme }) => theme.colorV2.black};
        font-size: 20px;
        font-weight: 500;
      }
    }
  `,
  Soon: styled.div`
    display: flex;
    padding: 3px 8px;
    align-items: center;
    gap: 10px;
    height: 25px;

    border-radius: 99px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colorV2.gray[2]};
    border: 1px solid ${({ theme }) => theme.color.blackAlpha[100]};

    color: ${({ theme }) => theme.colorV2.gray[6]};

    font-size: 13px;
    font-weight: 400;
  `,
  NewTag: styled.div`
    width: 50px;
    height: 25px;

    display: flex;
    align-items: center;
    justify-content: center;

    color: ${({ theme }) => theme.colorV2.white} !important;
    border-radius: 4px;
    background: linear-gradient(108deg, #3c43ee -11.12%, #ab00fc 110.08%);

    font-size: 13px;
    font-weight: 500;
  `
}
