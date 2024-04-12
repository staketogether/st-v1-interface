import NewStakeControl from '@/components/new-stake/NewStakeControl'
import BuyEthControlModal from '@/components/ramp/BuyEthControlModal'
import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import { globalConfig } from '@/config/global'
import { productStakingList } from '@/config/product-staking'
import { fiatAmountVar, openQuoteEthModal } from '@/hooks/ramp/useControlModal'
import useTransak from '@/hooks/useTransak'
import { AllowedNetwork, handleChainIdByNetwork } from '@/services/format'
import { ProductMarketAssetData, ProductStaking } from '@/types/ProductStaking'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export type ProductProps = {
  product: ProductStaking
  assetData: ProductMarketAssetData
  chainId: number
}

export default function Product({ product, assetData, chainId }: ProductProps) {
  const router = useRouter()
  const minAmount = '300'
  const { onInit: buyCrypto } = useTransak({
    productsAvailed: 'BUY'
  })

  useEffect(() => {
    if (router.query.payment === 'pix' && router.query.provider == 'brla') {
      fiatAmountVar(router.query?.amount?.toString() ?? minAmount)
      openQuoteEthModal(product.name)
    } else if (router.query.payment === 'credit') {
      buyCrypto()
    }
  }, [buyCrypto, product, router, router.events, router.query?.amount, router.query.buy])

  return (
    <LayoutTemplate>
      <Metatags />
      <NewStakeControl type='deposit' product={product} assetData={assetData} chainId={chainId} />
      <BuyEthControlModal stakingProduct={product.name} />
    </LayoutTemplate>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [
    { params: { network: 'ethereum', currency: 'usd', type: 'staking', product: 'ethereum-stake' } },
    { params: { network: 'ethereum', currency: 'brl', type: 'staking', product: 'ethereum-stake' } },
    { params: { network: 'ethereum', currency: 'eur', type: 'staking', product: 'ethereum-stake' } },

    { params: { network: 'optimism', currency: 'usd', type: 'staking', product: 'ethereum-restaking' } },
    { params: { network: 'optimism', currency: 'brl', type: 'staking', product: 'ethereum-restaking' } },
    { params: { network: 'optimism', currency: 'eur', type: 'staking', product: 'ethereum-restaking' } },

    { params: { network: 'optimism', currency: 'usd', type: 'assets', product: 'btc' } },
    { params: { network: 'optimism', currency: 'brl', type: 'assets', product: 'btc' } },
    { params: { network: 'optimism', currency: 'eur', type: 'assets', product: 'btc' } },

    { params: { network: 'optimism', currency: 'usd', type: 'assets', product: 'eth' } },
    { params: { network: 'optimism', currency: 'brl', type: 'assets', product: 'eth' } },
    { params: { network: 'optimism', currency: 'eur', type: 'assets', product: 'eth' } }
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
  const findProduct = productStakingList.find(item => item.name === product)

  const chainId = handleChainIdByNetwork(network)

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
