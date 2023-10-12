import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import { type GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { WrapContainer } from '@/components/wrap/Wrap'

export default function Wrap() {
  return (
    <LayoutTemplate>
      <Metatags />

      <WrapContainer />
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
