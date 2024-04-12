import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import TokensControl from '@/components/tokens/components/TokensControl'
import { productStakingList } from '@/config/product-staking'
import { ProductStaking } from '@/types/ProductStaking'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type StakingProps = {
  productList: ProductStaking[]
}

export default function Staking({ productList }: StakingProps) {
  return (
    <LayoutTemplate>
      <Metatags />
      <TokensControl type='staking' productsList={productList} />
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
  if (!productStakingList || !productStakingList.length) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      productList: productStakingList,
      ...(await serverSideTranslations(locale || 'en', ['common']))
    },
    revalidate: 24 * 60 * 60
  }
}
