import NewStakeControl from '@/components/new-stake/NewStakeControl'
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
import { Staking } from '@/types/Staking'
import { MobulaAsset } from '@/types/MobulaAsset'
import { chainConfigByChainId } from '@/config/chain'
import { stakingList } from '@/config/product/staking'
import { MobulaMarketAsset } from '@/types/MobulaMarketAsset'

export interface ProductProps {
  product: Staking
  assetData: MobulaMarketAsset
  chainId: number
}

export default function Product({ product, assetData, chainId }: ProductProps) {
  const router = useRouter()
  const minAmount = product.asset.ramp[0].minDeposit
  const config = chainConfigByChainId(chainId)
  const { onInit: buyCrypto } = useTransak({
    productsAvailed: 'BUY',
    network: config.name.toLowerCase()
  })

  useEffect(() => {
    if (router.query.payment === 'pix' && router.query.provider == 'brla') {
      fiatAmountVar(router.query?.amount?.toString() ?? minAmount.toString())
      openQuoteEthModal(product.asset)
    } else if (router.query.payment === 'credit') {
      buyCrypto()
    }
  }, [buyCrypto, minAmount, product, router.query?.amount, router.query.payment, router.query.provider])

  return (
    <LayoutTemplate>
      <Metatags />
      <NewStakeControl type='deposit' product={product} assetData={assetData} chainId={chainId} />
      <BuyEthControlModal chainId={chainId}/>
    </LayoutTemplate>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths = [
    { params: { network: 'ethereum', currency: 'usd', type: 'staking', product: 'ethereum-stake' } },
    { params: { network: 'ethereum', currency: 'brl', type: 'staking', product: 'ethereum-stake' } },
    { params: { network: 'ethereum', currency: 'eur', type: 'staking', product: 'ethereum-stake' } },

    { params: { network: 'optimism', currency: 'usd', type: 'staking', product: 'ethereum-restaking' } },
    { params: { network: 'optimism', currency: 'brl', type: 'staking', product: 'ethereum-restaking' } },
    { params: { network: 'optimism', currency: 'eur', type: 'staking', product: 'ethereum-restaking' } }
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
  const productSelected = stakingList.find(item => item.id === product)

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
      ...(await serverSideTranslations(locale ?? 'en', ['common']))
    },
    revalidate: 24 * 60 * 60
  }
}
