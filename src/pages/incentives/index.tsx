import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { GetServerSideProps } from 'next'
import LayoutTemplate from '../../components/shared/layout/LayoutTemplate'

export default function Pools() {
  return <LayoutTemplate>Incentives</LayoutTemplate>
}

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'], null, ['en']))
    }
  }
}
