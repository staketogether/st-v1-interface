import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import TokensControl from '../../../../components/tokens/TokensControl'
import { handleProductConfig } from '@/config/product'
import { Product } from '@/types/Product'

type TokensProps = {
  productsList: Product[]
}

export default function Tokens({ productsList }: TokensProps) {
  return (
    <LayoutTemplate>
      <Metatags />
      <TokensControl productsList={productsList} />
    </LayoutTemplate>
  )
}
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [
    { params: { network: 'mainnet', currency: 'usd', product: 'ethereum' } },
    { params: { network: 'mainnet', currency: 'brl', product: 'ethereum' } },
    { params: { network: 'mainnet', currency: 'eur', product: 'ethereum' } },
    { params: { network: 'goerli', currency: 'usd', product: 'ethereum' } },
    { params: { network: 'goerli', currency: 'brl', product: 'ethereum' } },
    { params: { network: 'goerli', currency: 'eur', product: 'ethereum' } }
  ]

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { network, currency } = params as { network: string; currency: string; product: string }
  const productsList = handleProductConfig(network, currency)

  if (!productsList || !productsList.length) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      productsList,
      ...(await serverSideTranslations(locale || 'en', ['common']))
    },
    revalidate: 24 * 60 * 60
  }
}
