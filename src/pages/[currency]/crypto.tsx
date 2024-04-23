import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import AssetControl from '@/components/asset/AssetControl'
import { getAssetsByCategory } from '@/config/product/asset'
import { Asset, AssetCategory } from '@/types/Asset'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface CryptoProps {
  assetsList: Asset[]
}

export default function Crypto({ assetsList }: CryptoProps) {
  return (
    <LayoutTemplate>
      <Metatags />
      <AssetControl category={AssetCategory.Crypto} assetsList={assetsList} />
    </LayoutTemplate>
  )
}
export const getStaticPaths: GetStaticPaths = () => {
  const paths = [{ params: { currency: 'usd' } }, { params: { currency: 'brl' } }, { params: { currency: 'eur' } }]

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const assetsList = getAssetsByCategory(AssetCategory.Crypto)

  if (!assetsList?.length) {
    return {
      notFound: true
    }
  }

  console.log('assetsList:', assetsList)

  return {
    props: {
      assetsList,
      ...(await serverSideTranslations(locale ?? 'en', ['common']))
    },
    revalidate: 24 * 60 * 60
  }
}
