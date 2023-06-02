import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LayoutHead from '../../../components/shared/layout/LayoutHead'
import LayoutTemplate from '../../../components/shared/layout/LayoutTemplate'
import StakeControl from '../../../components/stake/StakeControl'
import useTranslation from '../../../hooks/useTranslation'

export default function Deposit() {
  const { t } = useTranslation()

  return (
    <LayoutTemplate>
      <LayoutHead text={t('titles.stake')} />
      <StakeControl community={undefined} type='deposit' />
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
