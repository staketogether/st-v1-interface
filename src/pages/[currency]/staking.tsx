import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import TokensControl from '@/components/tokens/components/TokensControl'
import { productList } from '@/config/product'
import { Product } from '@/types/Product'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type StakingProps = {
  productList: Product[]
}

export default function Staking({ productList }: StakingProps) {
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
