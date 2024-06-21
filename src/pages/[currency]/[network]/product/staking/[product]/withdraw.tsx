import NewStakeControl from '@/components/new-stake/NewStakeControl'
import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import { globalConfig } from '@/config/global'
import { AllowedNetworks, handleChainIdByNetwork } from '@/services/format'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Staking } from '@/types/Staking'
import { stakingList } from '@/config/product/staking'
import { Asset } from '@/types/Asset'

export interface HomeProps {
  product: Staking
  assetData: Asset
  chainId: number
}

export default function Home({ product, assetData, chainId }: HomeProps) {
  return (
    <LayoutTemplate>
      <Metatags />
      <NewStakeControl type='withdraw' staking={product} assetData={assetData} chainId={chainId} />
    </LayoutTemplate>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: 'blocking' }
}
async function fetchProductAssetData(uri: string): Promise<Asset> {
  const { backendUrl } = globalConfig
  const marketData = await axios.get<Asset>(`${backendUrl}/api/${uri}`)

  return marketData.data
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { product, network } = params as { network: AllowedNetworks; currency: string; product: string }

  const chainId = handleChainIdByNetwork(network)
  const foundProduct = stakingList.find(item => item.id === product)

  if (!foundProduct || !chainId) {
    return {
      notFound: true
    }
  }

  const assetData = await fetchProductAssetData(`assets/${chainId}/${foundProduct.asset.contractAddress}`)

  if (!assetData) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      assetData,
      chainId,
      product: foundProduct,
      ...(await serverSideTranslations(locale ?? 'en', ['common']))
    },
    revalidate: 24 * 60 * 60
  }
}
