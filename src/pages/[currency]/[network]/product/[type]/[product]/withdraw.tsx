import NewStakeControl from '@/components/new-stake/NewStakeControl'
import BuyEthControlModal from '@/components/ramp/BuyEthControlModal'
import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import { globalConfig } from '@/config/global'
import { productStakingList } from '@/config/product-staking'
import { fiatAmountVar, openBrlaModalVar } from '@/hooks/ramp/useControlModal'
import useTransak from '@/hooks/useTransak'
import { AllowedNetwork, handleChainIdByNetwork } from '@/services/format'
import { ProductMarketAssetData, ProductStaking } from '@/types/ProductStaking'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export type HomeProps = {
  product: ProductStaking
  assetData: ProductMarketAssetData
  chainId: number
}

export default function Home({ product, assetData, chainId }: HomeProps) {
  const router = useRouter()
  const minAmount = '100'
  const { onInit: buyCrypto } = useTransak({
    productsAvailed: 'BUY'
  })

  useEffect(() => {
    if (router.query?.buy && router.query.payment === 'pix' && router.query.provider == 'brla') {
      fiatAmountVar(router.query?.amount?.toString() ?? minAmount)
      openBrlaModalVar(true)
    } else if (router.query.payment === 'credit') {
      buyCrypto()
    }
  }, [buyCrypto, router, router.events, router.query?.amount, router.query?.buy])

  return (
    <LayoutTemplate>
      <Metatags />
      <NewStakeControl type='withdraw' product={product} assetData={assetData} chainId={chainId} />
      <BuyEthControlModal stakingProduct={product.name} />
    </LayoutTemplate>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [
    { params: { network: 'ethereum', currency: 'usd', product: 'ethereum-stake' } },
    { params: { network: 'ethereum', currency: 'brl', product: 'ethereum-stake' } },
    { params: { network: 'ethereum', currency: 'eur', product: 'ethereum-stake' } },
    { params: { network: 'optimism', currency: 'usd', product: 'ethereum-restaking' } },
    { params: { network: 'optimism', currency: 'brl', product: 'ethereum-restaking' } },
    { params: { network: 'optimism', currency: 'eur', product: 'ethereum-restaking' } }
  ]

  return { paths, fallback: 'blocking' }
}

async function fetchProductAssetData(
  uri: string,
  asset: string,
  blockchain: string,
  symbol: string
): Promise<ProductMarketAssetData> {
  const { backendUrl } = globalConfig
  return axios
    .get<ProductMarketAssetData>(`${backendUrl}/api/${uri}`, {
      params: {
        asset,
        blockchain,
        symbol
      }
    })
    .then(res => res.data)
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { product, network } = params as { network: AllowedNetwork; currency: string; product: string }

  const chainId = handleChainIdByNetwork(network)
  const findProduct = productStakingList.find(item => item.name === product)

  if (!findProduct || !chainId) {
    return {
      notFound: true
    }
  }

  const assetData = await fetchProductAssetData('mobula/market-asset-data', 'Ethereum', 'ethereum', 'eth')

  if (!assetData) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      assetData,
      chainId,
      product: findProduct,
      ...(await serverSideTranslations(locale || 'en', ['common']))
    },
    revalidate: 24 * 60 * 60
  }
}
