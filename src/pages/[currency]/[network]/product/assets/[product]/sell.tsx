import BuyEthControlModal from '@/components/ramp/BuyEthControlModal'
import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import { globalConfig } from '@/config/global'
import { fiatAmountVar, openQuoteEthModal } from '@/hooks/ramp/useControlModal'
import useTransak from '@/hooks/useTransak'
import { AllowedNetworks, handleChainIdByNetwork } from '@/services/format'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { MobulaAsset } from '@/types/MobulaAsset'
import { chainConfigByChainId } from '@/config/chain'
import { Asset } from '@/types/Asset'
import { assetsList } from '@/config/product/asset'
import AssetsControl from '@/components/assets/AssetsControl'
import { MobulaMarketAsset } from '@/types/MobulaMarketAsset'

export interface ProductProps {
  product: Asset
  assetData: MobulaMarketAsset
  chainId: number
}

export default function Product({ product, assetData, chainId }: ProductProps) {
  const router = useRouter()
  const minAmount = product.ramp[0].minDeposit
  const config = chainConfigByChainId(product.chains[0])
  const { onInit: buyCrypto } = useTransak({
    productsAvailed: 'BUY',
    network: config.name.toLowerCase()
  })

  useEffect(() => {
    if (router.query.payment === 'pix' && router.query.provider == 'brla') {
      fiatAmountVar(router.query?.amount?.toString() ?? minAmount.toString())
      //TROCAR PARA O PRODUTO CORRETO
      openQuoteEthModal(product)
    } else if (router.query.payment === 'credit') {
      buyCrypto()
    }
  }, [buyCrypto, minAmount, product, router, router.events, router.query?.amount, router.query.buy])

  return (
    <LayoutTemplate>
      <Metatags />
      <AssetsControl product={product} assetData={assetData} chainId={chainId} type='buy' />
      <BuyEthControlModal chainId={chainId}/>
    </LayoutTemplate>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
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

async function fetchProductAssetData(uri: string, asset: string, blockchain: string, symbol: string): Promise<MobulaAsset> {
  const { backendUrl } = globalConfig
  return axios
    .get<MobulaAsset>(`${backendUrl}/api/${uri}`, {
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

  const productSelected = assetsList.find(item => item.id === product)

  const chainId = handleChainIdByNetwork(network)

  if (!productSelected || !chainId) {
    return {
      notFound: true
    }
  }

  const assetData = await fetchProductAssetData(
    'mobula/market-asset-data',
    productSelected.mobula.asset,
    productSelected.mobula.blockchain,
    productSelected.mobula.symbol
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
      ...(await serverSideTranslations(locale ?? 'en', ['common']))
    },
    revalidate: 24 * 60 * 60
  }
}
