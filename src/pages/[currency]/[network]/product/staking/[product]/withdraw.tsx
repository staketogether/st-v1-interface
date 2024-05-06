import NewStakeControl from '@/components/new-stake/NewStakeControl'
import BuyEthControlModal from '@/components/ramp/BuyEthControlModal'
import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import { globalConfig } from '@/config/global'
import { amountToQuoteVar, openBrlaModalVar } from '@/hooks/ramp/useControlModal'
import useTransak from '@/hooks/useTransak'
import { AllowedNetworks, handleChainIdByNetwork } from '@/services/format'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Staking } from '@/types/Staking'
import { chainConfigByChainId } from '@/config/chain'
import { stakingList } from '@/config/product/staking'
import { AssetStats } from '@/types/AssetStats'

export interface HomeProps {
  product: Staking
  assetData: AssetStats
  chainId: number
}

export default function Home({ product, assetData, chainId }: HomeProps) {
  const router = useRouter()
  const minAmount = '100'
  const config = chainConfigByChainId(chainId)
  const { onInit: buyCrypto } = useTransak({
    productsAvailed: 'BUY',
    network: config.name.toLowerCase()
  })

  useEffect(() => {
    if (router.query?.buy && router.query.payment === 'pix' && router.query.provider == 'brla') {
      amountToQuoteVar(router.query?.amount?.toString() ?? minAmount)
      openBrlaModalVar(true)
    } else if (router.query.payment === 'credit') {
      buyCrypto()
    }
  }, [buyCrypto, router, router.events, router.query?.amount, router.query?.buy])

  return (
    <LayoutTemplate>
      <Metatags />
      <NewStakeControl type='withdraw' product={product} assetData={assetData} chainId={chainId} />
      <BuyEthControlModal chainId={chainId} />
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

  const contractAddress =
    foundProduct.asset.type === 'native' ? foundProduct.asset.wrapperContractAddress : foundProduct.asset.contractAddress

  const assetData = await fetchProductAssetData(`asset-stats/${chainId}/${contractAddress}`)

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
