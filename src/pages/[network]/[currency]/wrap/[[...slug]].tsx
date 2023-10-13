import { type GetServerSideProps } from 'next'
import { LayoutTemplate } from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { WrapPage } from '@/components/wrap/WrapPage'

export default function Wrap() {
  return (
    <LayoutTemplate>
      <Metatags />
      <WrapPage />
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common']))
    }
  }
}
