import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import TokensControl from '@/components/tokens/TokensControl'
import { stakingList } from '@/config/products/staking'
import { ProductStaking } from '@/types/ProductStaking'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface StakingProps {
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
export const getStaticPaths: GetStaticPaths = () => {
  const paths = [{ params: { currency: 'usd' } }, { params: { currency: 'brl' } }, { params: { currency: 'eur' } }]

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (!stakingList?.length) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      productList: stakingList,
      ...(await serverSideTranslations(locale ?? 'en', ['common']))
    },
    revalidate: 24 * 60 * 60
  }
}
