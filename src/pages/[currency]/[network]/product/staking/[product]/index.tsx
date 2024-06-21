import NewStakeControl from '@/components/new-stake/NewStakeControl'
import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import { globalConfig } from '@/config/global'
import { AllowedNetworks, handleChainIdByNetwork } from '@/services/format'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Staking } from '@/types/Staking'
import { stakingList } from '@/config/product/staking'
import { Asset } from '@/types/Asset'

export interface ProductProps {
  product: Staking
  assetData: Asset
  chainId: number
}

export default function Product({ product, assetData, chainId }: ProductProps) {
  // const router = useRouter()
  // const minAmount = product.asset.ramp[0].minDeposit
  // const config = chainConfigByChainId(chainId)

  // const { onInit: buyCrypto } = useTransak({
  //   productsAvailed: 'BUY',
  //   network: config.name.toLowerCase()
  // })

  // useEffect(() => {
  //   if (router.query.payment === 'pix' && router.query.provider == 'brla') {
  //     amountToQuoteVar(router.query?.amount?.toString() ?? minAmount.toString())
  //     openQuoteEthModal(product.asset)
  //   } else if (router.query.payment === 'credit') {
  //     buyCrypto()
  //   }
  // }, [buyCrypto, minAmount, product, router.query?.amount, router.query.payment, router.query.provider])

  return (
    <LayoutTemplate>
      <Metatags />
      <NewStakeControl type='deposit' staking={product} assetData={assetData} chainId={chainId} />
    </LayoutTemplate>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: 'blocking' }
}

async function fetchProductAssetData(uri: string): Promise<Asset> {
  const { backendUrl } = globalConfig
  const marketData = await axios.get<Asset>(`${backendUrl}/api/${uri}`)
  return marketData.data
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { product, network } = params as {
    network: AllowedNetworks
    product: string
  }
  const productSelected = stakingList.find(item => item.id === product)

  const chainId = handleChainIdByNetwork(network)

  if (!productSelected || !chainId || productSelected.asset.type === 'bitcoin') {
    return {
      notFound: true
    }
  }

  const assetData = await fetchProductAssetData(`assets/${chainId}/${productSelected.asset.contractAddress}`)

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
