import NewStakeControl from '@/components/new-stake/NewStakeControl'
import BuyEthControlModal from '@/components/ramp/BuyEthControlModal'
import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import { globalConfig } from '@/config/global'
import { fiatAmountVar, openBrlaModalVar } from '@/hooks/ramp/useControlModal'
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
import { MobulaMarketAsset, MobulaMarketAssetResponse } from '@/types/MobulaMarketAsset'

export interface HomeProps {
  product: Staking
  assetData: MobulaMarketAsset
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
      <BuyEthControlModal chainId={chainId} />
    </LayoutTemplate>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths = [
    { params: { network: 'ethereum', currency: 'usd', type: 'staking', product: 'eth-staking' } },
    { params: { network: 'ethereum', currency: 'brl', type: 'staking', product: 'eth-staking' } },
    { params: { network: 'ethereum', currency: 'eur', type: 'staking', product: 'eth-staking' } },

    { params: { network: 'optimism', currency: 'usd', type: 'staking', product: 'eth-restaking' } },
    { params: { network: 'optimism', currency: 'brl', type: 'staking', product: 'eth-restaking' } },
    { params: { network: 'optimism', currency: 'eur', type: 'staking', product: 'eth-restaking' } }
  ]

  return { paths, fallback: 'blocking' }
}
async function fetchProductAssetData(uri: string, asset: string, blockchain: string, symbol: string): Promise<MobulaMarketAsset> {
  const { backendUrl } = globalConfig
  const marketData = await axios.get<MobulaMarketAssetResponse>(`${backendUrl}/api/${uri}`, {
    params: {
      asset,
      blockchain,
      symbol
    }
  })
  return marketData.data.data
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { product, network } = params as { network: AllowedNetworks; currency: string; product: string }

  const chainId = handleChainIdByNetwork(network)
  const findProduct = stakingList.find(item => item.id === product)

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
      ...(await serverSideTranslations(locale ?? 'en', ['common']))
    },
    revalidate: 24 * 60 * 60
  }
}
