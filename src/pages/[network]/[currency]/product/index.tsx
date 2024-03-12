import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { productList } from '@/config/product'
import { Product } from '@/types/Product'
import { AllowedNetwork, handleChainIdByNetwork } from '@/services/format'
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
    { params: { network: 'ethereum', currency: 'usd', product: 'ethereum-stake' } },
    { params: { network: 'ethereum', currency: 'brl', product: 'ethereum-stake' } },
    { params: { network: 'ethereum', currency: 'eur', product: 'ethereum-stake' } },
    { params: { network: 'goerli', currency: 'usd', product: 'ethereum-stake' } },
    { params: { network: 'goerli', currency: 'brl', product: 'ethereum-stake' } },
    { params: { network: 'goerli', currency: 'eur', product: 'ethereum-stake' } }
  ]

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const { network } = params as { network: AllowedNetwork }

  const chainId = handleChainIdByNetwork(network)

  if (!productList || !productList.length || !chainId) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      productList,
      chainId,
      ...(await serverSideTranslations(locale || 'en', ['common']))
    },
    revalidate: 24 * 60 * 60
  }
}
