import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LayoutHead from '../../../components/shared/layout/LayoutHead'
import LayoutTemplate from '../../../components/shared/layout/LayoutTemplate'
import { MetaPool } from '../../../components/shared/meta/MetaPool'
import StakeControl from '../../../components/stake/StakeControl'
import useTranslation from '../../../hooks/useTranslation'

export default function Deposit() {
  const { t } = useTranslation()

  return (
    <LayoutTemplate>
      <MetaPool />
      <LayoutHead text={t('titles.stake')} />
      <StakeControl pool={undefined} type='deposit' />
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  context.res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=600')

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'], null, ['en']))
    }
  }
}
