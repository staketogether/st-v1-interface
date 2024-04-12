import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import TokensControl from '@/components/tokens/components/TokensControl'
import { productAssetList } from '@/config/product-asset'

import { ProductAsset } from '@/types/ProductAsset'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type AssetsProps = {
  productList: ProductAsset[]
}

export default function Assets({ productList }: AssetsProps) {
  return (
    <LayoutTemplate>
      <Metatags />
      <TokensControl type='assets' productsList={productList} />
    </LayoutTemplate>
  )
}
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [
    { params: { currency: 'usd' } },
    { params: { currency: 'brl' } },
    { params: { currency: 'eur' } }
  ]

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (!productAssetList || !productAssetList.length) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      productList: productAssetList,
      ...(await serverSideTranslations(locale || 'en', ['common']))
    },
    revalidate: 24 * 60 * 60
  }
}
