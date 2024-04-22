import AssetsControl from '@/components/assets/AssetsControl'
import BuyEthControlModal from '@/components/ramp/BuyEthControlModal'
import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import { chainConfigByChainId } from '@/config/chain'
import { globalConfig } from '@/config/global'
import { assetsList } from '@/config/product/asset'
import { clearModal, fiatAmountVar, openQuoteEthModal } from '@/hooks/ramp/useControlModal'
import useTransak from '@/hooks/useTransak'
import { AllowedNetworks, handleChainIdByNetwork } from '@/services/format'
import { Asset } from '@/types/Asset'
import { MobulaMarketAsset, MobulaMarketAssetResponse } from '@/types/MobulaMarketAsset'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export interface ProductProps {
  asset: Asset
  assetData: MobulaMarketAsset
  chainId: number
}

export default function Product({ asset, assetData, chainId }: ProductProps) {
  const router = useRouter()
  const minAmount = asset.ramp[0].minDeposit
  const config = chainConfigByChainId(asset.chains[0])
  const { onInit: buyCrypto } = useTransak({
    productsAvailed: 'BUY',
    network: config.name.toLowerCase()
  })
  clearModal()


  useEffect(() => {
    if (router.query.payment === 'pix' && router.query.provider == 'brla') {
      fiatAmountVar(router.query?.amount?.toString() ?? minAmount.toString())
      openQuoteEthModal(asset)
    } else if (router.query.payment === 'credit') {
      buyCrypto()
    }
  }, [buyCrypto, minAmount, asset, router.query?.amount, router.query.payment, router.query.provider])

  return (
    <LayoutTemplate>
      <Metatags />
      <AssetsControl product={asset} assetData={assetData} chainId={chainId} type='buy' />
      <BuyEthControlModal chainId={chainId} />
    </LayoutTemplate>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths = [
    { params: { network: 'optimism', currency: 'usd', type: 'assets', product: 'btc-op' } },
    { params: { network: 'optimism', currency: 'brl', type: 'assets', product: 'eth-op' } },
    { params: { network: 'optimism', currency: 'eur', type: 'assets', product: 'eth-mainnet' } },
  ]

  return { paths, fallback: 'blocking' }
}

async function fetchProductAssetData(uri: string, asset: string, blockchain: string, symbol: string): Promise<MobulaMarketAsset> {
  const { backendUrl } = globalConfig
  const marketData = await axios
    .get<MobulaMarketAssetResponse>(`${backendUrl}/api/${uri}`, {
      params: {
        asset,
        blockchain,
        symbol
      }
    })
  return marketData.data.data
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
      asset: productSelected,
      ...(await serverSideTranslations(locale ?? 'en', ['common']))
    },
    revalidate: 24 * 60 * 60
  }
}
