import CryptoPageControl from '@/components/pages/crypto/CryptoPageControl'
import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import { assetsList } from '@/config/product/asset'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Crypto() {
  return (
    <LayoutTemplate>
      <Metatags />
      <CryptoPageControl />
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
      ...(await serverSideTranslations(locale ?? 'en', ['common']))
    }
  }
}
