import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'

import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import TokensControl from '../../../../components/tokens/TokensControl'

export default function Tokens() {
  return (
    <LayoutTemplate>
      <Metatags />
      <TokensControl />
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
