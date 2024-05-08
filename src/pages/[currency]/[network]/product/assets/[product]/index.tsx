import AssetsControl from '@/components/assets/AssetsControl'
import BuyEthControlModal from '@/components/ramp/BuyEthControlModal'
import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import { chainConfigByChainId } from '@/config/chain'
import { globalConfig } from '@/config/global'
import { assetsList } from '@/config/product/asset'
import { amountToQuoteVar, openBrlaModalVar, openQuoteEthModal } from '@/hooks/ramp/useControlModal'
import useTransak from '@/hooks/useTransak'
import { AllowedNetworks, handleChainIdByNetwork } from '@/services/format'
import { Asset } from '@/types/Asset'
import { AssetStats } from '@/types/AssetStats'
import { useReactiveVar } from '@apollo/client'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export interface ProductProps {
  asset: Asset
  assetData: AssetStats
  chainId: number
}

export default function Product({ asset, assetData, chainId }: ProductProps) {
  const router = useRouter()
  const controlModal = useReactiveVar(openBrlaModalVar)
  const minAmount = asset.ramp[0].minDeposit
  const config = chainConfigByChainId(asset.chains[0])
  const { onInit: buyCrypto } = useTransak({
    productsAvailed: 'BUY',
    network: config.name.toLowerCase()
  })

  useEffect(() => {
    if (router.query.payment === 'pix' && router.query.provider == 'brla') {
      amountToQuoteVar(router.query?.amount?.toString() ?? minAmount.toString())
      openQuoteEthModal(asset)
    } else if (router.query.payment === 'credit') {
      buyCrypto()
    }
  }, [buyCrypto, minAmount, asset, router.query?.amount, router.query.payment, router.query.provider])

  return (
    <LayoutTemplate>
      <Metatags />
      <AssetsControl product={asset} assetData={assetData} chainId={chainId} type='buy' />
      {controlModal && <BuyEthControlModal />}
    </LayoutTemplate>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  const networks = [
    { network: 'optimism', chainId: 10 },
    { network: 'ethereum', chainId: 1 },
    { network: 'chiliz', chainId: 88888 }
  ]
  const currencies = ['usd', 'brl', 'eur']

  const paths = networks
    .map(network => {
      return assetsList
        .filter(asset => asset.chains.includes(network.chainId) && asset.enabled && asset.listed)
        .map(asset => {
          return currencies.map(currency => {
            return {
              params: {
                network: network.network,
                currency,
                type: 'assets',
                product: asset.id
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

  const assetData = await fetchProductAssetData(`asset-stats/${chainId}/${productSelected.contractAddress}`)

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
