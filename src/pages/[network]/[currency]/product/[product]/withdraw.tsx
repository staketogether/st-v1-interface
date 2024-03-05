import NewStakeControl from '@/components/new-stake/NewStakeControl'
import BuyEthControlModal from '@/components/ramp/BuyEthControlModal'
import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import { globalConfig } from '@/config/global'
import { handleProductConfig } from '@/config/product'
import { fiatAmountVar, openBrlaModalVar } from '@/hooks/ramp/useControlModal'
import useTransak from '@/hooks/useTransak'
import { Product, ProductMarketAssetData } from '@/types/Product'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export type HomeProps = {
  product: Product
  assetData: ProductMarketAssetData
}

export default function Home({ product, assetData }: HomeProps) {
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
      <NewStakeControl type='withdraw' product={product} assetData={assetData} />
      <BuyEthControlModal />
    </LayoutTemplate>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [
    { params: { network: 'mainnet', currency: 'usd', product: 'ethereum' } },
    { params: { network: 'mainnet', currency: 'brl', product: 'ethereum' } },
    { params: { network: 'mainnet', currency: 'eur', product: 'ethereum' } },
    { params: { network: 'goerli', currency: 'usd', product: 'ethereum' } },
    { params: { network: 'goerli', currency: 'brl', product: 'ethereum' } },
    { params: { network: 'goerli', currency: 'eur', product: 'ethereum' } }
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
  const { network, currency, product } = params as { network: string; currency: string; product: string }
  const productsList = handleProductConfig(network, currency)
  const findProduct = productsList.find(item => item.name === product)

  if (!findProduct) {
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
      product: findProduct,
      ...(await serverSideTranslations(locale || 'en', ['common']))
    },
    revalidate: 24 * 60 * 60
  }
}
