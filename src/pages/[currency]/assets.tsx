import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import TokensControl from '@/components/tokens/TokensControl'
import { productCryptoList } from '@/config/products/crypto'

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
  if (!productCryptoList || !productCryptoList.length) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      productList: productCryptoList.filter(product => {
        if (product.listed) return product
      }),
      ...(await serverSideTranslations(locale || 'en', ['common']))
    },
    revalidate: 24 * 60 * 60
  }
}
