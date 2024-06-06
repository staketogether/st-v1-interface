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
import { AssetStats } from '@/types/AssetStats'

export interface HomeProps {
  product: Staking
  assetData: AssetStats
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
  const networks = [
    { network: 'optimism', chainId: 10 },
    { network: 'ethereum', chainId: 1 }
  ]

  const currencies = ['usd', 'brl', 'eur']

  const paths = networks
    .map(network => {
      return stakingList
        .filter(staking => staking.enabled && staking.listed && staking.asset.chains.includes(network.chainId))
        .map(product => {
          return currencies.map(currency => {
            return {
              params: {
                network: network.network,
                currency,
                type: 'staking',
                product: product.id
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
