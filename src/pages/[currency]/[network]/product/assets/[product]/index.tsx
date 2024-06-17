import AssetsControl from '@/components/assets/AssetsControl'
import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import { assetsList } from '@/config/product/asset'
import { AllowedNetworks, handleChainIdByNetwork } from '@/services/format'
import { Asset } from '@/types/Asset'
import { AssetStats } from '@/types/AssetStats'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export interface ProductProps {
  asset: Asset
  assetData: AssetStats
  chainId: number
}

export default function Product({ asset, chainId }: ProductProps) {
  return (
    <LayoutTemplate>
      <Metatags />
      <AssetsControl asset={asset} chainId={chainId} type='buy' />
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

  const productSelected = assetsList.find(item => item.id === product)

  const chainId = handleChainIdByNetwork(network)

  if (!productSelected || chainId === undefined) {
    return {
      notFound: true
    }
  }

  if (productSelected.type === 'bitcoin') {
    return {
      props: {
        assetData: {},
        chainId,
        asset: productSelected,
        ...(await serverSideTranslations(locale ?? 'en', ['common']))
      },
      revalidate: 24 * 60 * 60
    }
  }

  const assetData = await fetchProductAssetData(`assets/${chainId}/${productSelected.contractAddress}`)

  if (!assetData) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      chainId,
      asset: productSelected,
      ...(await serverSideTranslations(locale ?? 'en', ['common']))
    },
    revalidate: 24 * 60 * 60
  }
}
