import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import LayoutTemplate from '../../components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import IncentivesControl from '@/components/incentives/IncentivesControl'

export default function Incentives() {
  return (
    <LayoutTemplate>
      <Metatags />
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
