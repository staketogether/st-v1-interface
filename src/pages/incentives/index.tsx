import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { GetServerSideProps } from 'next'
import LayoutTemplate from '../../components/shared/layout/LayoutTemplate'

import { MetaPools } from '../../components/shared/meta/MetaPools'
import IncentivesControl from '@/components/incentives/AirdropControl'

export default function Incentives() {
  return (
    <LayoutTemplate>
      <MetaPools />
      <IncentivesControl />
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'], null, ['en']))
    }
  }
}
