import NewStakeControl from '@/components/new-stake/NewStakeControl'
import BuyEthControlModal from '@/components/ramp/BuyEthControlModal'
import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import { globalConfig } from '@/config/global'
import { productStakingList } from '@/config/products/staking'
import { fiatAmountVar, openQuoteEthModal } from '@/hooks/ramp/useControlModal'
import useTransak from '@/hooks/useTransak'
import { AllowedNetworks, handleChainIdByNetwork } from '@/services/format'
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
  const minAmount = product.asset.ramp.minDeposit
  const { onInit: buyCrypto } = useTransak({
    productsAvailed: 'BUY',
    network: product.networkAvailable
  })

  useEffect(() => {
    if (router.query.payment === 'pix' && router.query.provider == 'brla') {
      fiatAmountVar(router.query?.amount?.toString() ?? minAmount.toString())
      //TROCAR PARA O PRODUTO CORRETO
      const asset = product.asset
      openQuoteEthModal(asset)
    } else if (router.query.payment === 'credit') {
      buyCrypto()
    }
  }, [buyCrypto, minAmount, product, router, router.events, router.query?.amount, router.query.buy])

  return (
    <LayoutTemplate>
      <Metatags />
      <NewStakeControl
        type='deposit'
        product={product as ProductStaking}
        assetData={assetData}
        chainId={chainId}
      />
      <BuyEthControlModal />
    </LayoutTemplate>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [
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
  const { product, network } = params as {
    network: AllowedNetworks
    product: string
  }

  const productSelected = productStakingList.find(item => item.name === product)

  const chainId = handleChainIdByNetwork(network)

  if (!productSelected || !chainId) {
    return {
      notFound: true
    }
  }

  const assetData = await fetchProductAssetData(
    'mobula/market-asset-data',
    productSelected.asset.mobula.asset,
    productSelected.asset.mobula.blockchain,
    productSelected.asset.mobula.symbol
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
      product: productSelected,
      ...(await serverSideTranslations(locale || 'en', ['common']))
    },
    revalidate: 24 * 60 * 60
  }
}
