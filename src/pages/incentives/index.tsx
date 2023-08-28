import IncentivesControl from '@/components/incentives/IncentivesControl'
import { Metatags } from '@/components/shared/meta/Metatags'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LayoutTemplate from '../../components/shared/layout/LayoutTemplate'
import LayoutTitle from '../../components/shared/layout/LayoutTitle'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'

export default function Incentives() {
  const { t } = useLocaleTranslation()
  return (
    <LayoutTemplate>
      <Metatags />
      <LayoutTitle title={t('v2.pages.incentives.title')} description={t('v2.pages.incentives.description')} />
      <IncentivesControl />
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
