import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import AssetControl from '@/components/tokens/AssetControl'
import { getAssetsByCategory } from '@/config/asset'
import { Asset, AssetCategory } from '@/types/Asset'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface StakingProps {
  assetsList: Asset[]
}

export default function Staking({ assetsList }: StakingProps) {
  return (
    <LayoutTemplate>
      <Metatags />
      <AssetControl category={AssetCategory.Staking} assetsList={assetsList} />
    </LayoutTemplate>
  )
}
export const getStaticPaths: GetStaticPaths = () => {
  const paths = [{ params: { currency: 'usd' } }, { params: { currency: 'brl' } }, { params: { currency: 'eur' } }]

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const assetsList = getAssetsByCategory(AssetCategory.Staking)

  if (!assetsList?.length) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      assetsList,
      ...(await serverSideTranslations(locale ?? 'en', ['common']))
    },
    revalidate: 24 * 60 * 60
  }
}
