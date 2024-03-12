import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { productList } from '@/config/product'
import { Product } from '@/types/Product'
import TokensControl from '@/components/tokens/components/TokensControl'

type TokensProps = {
  productList: Product[]
}

export default function Tokens({ productList }: TokensProps) {
  return (
    <LayoutTemplate>
      <Metatags />
      <TokensControl productsList={productList} />
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
  if (!productList || !productList.length) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      productList,
      ...(await serverSideTranslations(locale || 'en', ['common']))
    },
    revalidate: 24 * 60 * 60
  }
}
