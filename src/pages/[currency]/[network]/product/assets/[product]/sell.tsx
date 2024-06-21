import AssetsControl from '@/components/assets/AssetsControl'
import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import { assetsList } from '@/config/product/asset'
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
      <AssetsControl assetId={assetId} chainId={chainId} type='sell' />
    </LayoutTemplate>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  const networks = [
    { network: 'optimism', chainId: 10 },
    { network: 'ethereum', chainId: 1 },
    { network: 'chiliz', chainId: 88888 },
    { network: 'era', chainId: 324 }
  ]
  const currencies = ['usd', 'brl', 'eur']

  const paths = networks
    .map(network => {
      return assetsList
        .filter(asset => asset.chains.includes(network.chainId) && asset.enabled && asset.listed)
        .map(asset => {
          return currencies.map(currency => {
            return {
              params: {
                network: network.network,
                currency,
                type: 'assets',
                product: asset.id
              }
            }
          })
        })
    })
    .flat(2)

  return { paths, fallback: 'blocking' }
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
