import AssetsControl from '@/components/assets/AssetsControl'
import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import { globalConfig } from '@/config/global'
import { assetsList } from '@/config/product/asset'
import { AllowedNetworks, handleChainIdByNetwork } from '@/services/format'
import { Asset } from '@/types/Asset'
import { AssetStats } from '@/types/AssetStats'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export interface ProductProps {
  product: Asset
  assetData: AssetStats
  chainId: number
}

export default function Product({ product, assetData, chainId }: ProductProps) {
  return (
    <LayoutTemplate>
      <Metatags />
      <AssetsControl asset={product} assetData={assetData} chainId={chainId} type='swap' />
    </LayoutTemplate>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  const networks = [
    { network: 'optimism', chainId: 10 },
    { network: 'ethereum', chainId: 1 },
    { network: 'chiliz', chainId: 88888 }
  ]
  const currencies = ['usd', 'brl', 'eur']

  const paths = networks
    .map(network => {
      return assetsList
        .filter(asset => asset.chains.includes(network.chainId) && asset.listed && asset.enabled)
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

async function fetchProductAssetData(uri: string): Promise<AssetStats> {
  const { backendUrl } = globalConfig
  const marketData = await axios.get<AssetStats>(`${backendUrl}/api/${uri}`)
  return marketData.data
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { product, network } = params as {
    network: AllowedNetworks
    product: string
  }

  const productSelected = assetsList.find(item => item.id === product)

  const chainId = handleChainIdByNetwork(network)

  if (!productSelected || !chainId) {
    return {
      notFound: true
    }
  }

  const assetData = await fetchProductAssetData(`asset-stats/${productSelected.chains[0]}/${productSelected.contractAddress}`)

  if (!assetData) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      assetData,
      chainId,
      product: productSelected,
      ...(await serverSideTranslations(locale ?? 'en', ['common']))
    },
    revalidate: 24 * 60 * 60
  }
}
