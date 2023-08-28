import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LayoutTemplate from '../../../components/shared/layout/LayoutTemplate'
import LayoutTitle from '../../../components/shared/layout/LayoutTitle'
import { Metatags } from '../../../components/shared/meta/Metatags'
import StakeControl from '../../../components/stake/StakeControl'
import useLocaleTranslation from '../../../hooks/useLocaleTranslation'

type WithdrawProps = {
  poolAddress: `0x${string}`
  name?: string
  avatar?: string
}

export default function Withdraw({ poolAddress }: WithdrawProps) {
  const { t } = useLocaleTranslation()

  return (
    <LayoutTemplate>
      <Metatags />
      <LayoutTitle title={t('v2.pages.deposit.title')} description={t('v2.pages.deposit.description')} />
      <StakeControl poolAddress={poolAddress} type='withdraw' />
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const params = context?.params as { address: `0x${string}` } | undefined

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'])),
      poolAddress: params?.address || ''
    }
  }
}
