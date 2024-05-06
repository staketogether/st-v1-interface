import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import AssetControl from '@/components/asset/AssetControl'
import { assetsList, getAssets } from '@/config/product/asset'
import { Asset } from '@/types/Asset'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface CryptoProps {
  assets: Asset[]
}

export default function Crypto({ assets }: CryptoProps) {
  return (
    <LayoutTemplate>
      <Metatags />
      <AssetControl assetsList={assets} />
    </LayoutTemplate>
  )
}
export const getStaticPaths: GetStaticPaths = () => {
  const paths = [{ params: { currency: 'usd' } }, { params: { currency: 'brl' } }, { params: { currency: 'eur' } }]

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (!assetsList?.length) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      assets: getAssets(),
      ...(await serverSideTranslations(locale ?? 'en', ['common']))
    },
    revalidate: 24 * 60 * 60
  }
}
