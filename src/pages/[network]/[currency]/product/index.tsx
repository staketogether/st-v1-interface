import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import TokensControl from '../../../../components/tokens/TokensControl'
import { productList } from '@/config/product'
import { Product } from '@/types/Product'

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
    { params: { network: 'ethereum', currency: 'usd', product: 'ethereum-stake' } },
    { params: { network: 'ethereum', currency: 'brl', product: 'ethereum-stake' } },
    { params: { network: 'ethereum', currency: 'eur', product: 'ethereum-stake' } }
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
