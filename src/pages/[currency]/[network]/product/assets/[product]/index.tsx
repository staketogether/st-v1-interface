import AssetsPageControl from '@/components/pages/assets/AssetsPageControl'
import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import { AllowedNetworks, handleChainIdByNetwork } from '@/services/format'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export interface ProductProps {
  assetId: string
  chainId: number
}

export default function Product({ assetId, chainId }: ProductProps) {
  return (
    <LayoutTemplate>
      <Metatags />
      <AssetsPageControl assetId={assetId} chainId={chainId} type='buy' />
    </LayoutTemplate>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { product, network } = params as {
    network: AllowedNetworks
    product: string
  }

  const chainId = handleChainIdByNetwork(network)

  if (!chainId) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      chainId,
      assetId: product,
      ...(await serverSideTranslations(locale ?? 'en', ['common']))
    },
    revalidate: 24 * 60 * 60
  }
}
