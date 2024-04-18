import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import TokensControl from '@/components/tokens/TokensControl'
import { productAssetList } from '@/config/products/asset'

import { ProductAsset } from '@/types/ProductAsset'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface AssetsProps {
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
export const getStaticPaths: GetStaticPaths = () => {
  const paths = [{ params: { currency: 'usd' } }, { params: { currency: 'brl' } }, { params: { currency: 'eur' } }]

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (!productAssetList?.length) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      productList: productAssetList.filter(product => {
        if (product.listed) return product
      }),
      ...(await serverSideTranslations(locale ?? 'en', ['common']))
    },
    revalidate: 24 * 60 * 60
  }
}
