import AssetsControl from '@/components/assets/AssetsControl'
import NewStakeControl from '@/components/new-stake/NewStakeControl'
import BuyEthControlModal from '@/components/ramp/BuyEthControlModal'
import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import { globalConfig } from '@/config/global'
import { productCryptoList } from '@/config/products/crypto'
import { productStakingList } from '@/config/products/staking'
import { fiatAmountVar, openQuoteEthModal } from '@/hooks/ramp/useControlModal'
import useTransak from '@/hooks/useTransak'
import { AllowedNetwork, handleChainIdByNetwork } from '@/services/format'
import { ProductAsset } from '@/types/ProductAsset'
import { ProductMarketAssetData, ProductStaking } from '@/types/ProductStaking'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export type ProductProps = {
  product: ProductStaking | ProductAsset
  assetData: ProductMarketAssetData
  productType: 'staking' | 'assets'
  chainId: number
}

export default function Product({ product, assetData, chainId, productType }: ProductProps) {
  const router = useRouter()
  const minAmount =
    productType === 'staking'
      ? (product as ProductStaking).asset.ramp.minDeposit
      : (product as ProductAsset).ramp.minDeposit
  const { onInit: buyCrypto } = useTransak({
    productsAvailed: 'BUY',
    network: product.networkAvailable
  })

  useEffect(() => {
    if (router.query.payment === 'pix' && router.query.provider == 'brla') {
      fiatAmountVar(router.query?.amount?.toString() ?? minAmount.toString())
      //TROCAR PARA O PRODUTO CORRETO
      const asset = productType === 'staking' ? (product as ProductStaking).asset : (product as ProductAsset)
      openQuoteEthModal(asset)
    } else if (router.query.payment === 'credit') {
      buyCrypto()
    }
  }, [
    buyCrypto,
    minAmount,
    product,
    productType,
    router,
    router.events,
    router.query?.amount,
    router.query.buy
  ])

  return (
    <LayoutTemplate>
      <Metatags />
      {productType === 'staking' ? (
        <NewStakeControl
          type='deposit'
          product={product as ProductStaking}
          assetData={assetData}
          chainId={chainId}
        />
      ) : (
        <AssetsControl product={product as ProductAsset} assetData={assetData} chainId={chainId} type='sell' />
      )}
      <BuyEthControlModal />
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
  const { product, network, type } = params as {
    network: AllowedNetwork
    type: 'staking' | 'assets'
    product: string
  }
  const findStakingProduct = productStakingList.find(item => item.name === product)
  const findAssetsProduct = productCryptoList.find(item => item.name === product)

  const productSelected = findStakingProduct || findAssetsProduct

  const chainId = handleChainIdByNetwork(network)

  if (!productSelected || !chainId) {
    return {
      notFound: true
    }
  }

  const assetData = await fetchProductAssetData(
    'mobula/market-asset-data',
    productSelected.getMobulaAssetData.asset,
    productSelected.getMobulaAssetData.blockchain,
    productSelected.getMobulaAssetData.symbol
  )

  if (!assetData) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      assetData,
      chainId,
      product: findStakingProduct || findAssetsProduct,
      productType: type,
      ...(await serverSideTranslations(locale || 'en', ['common']))
    },
    revalidate: 24 * 60 * 60
  }
}
