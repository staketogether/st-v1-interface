import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LayoutHead from '../../../components/shared/layout/LayoutHead'
import LayoutTemplate from '../../../components/shared/layout/LayoutTemplate'
import StakeControl from '../../../components/stake/StakeControl'
import usePool from '../../../hooks/subgraphs/usePool'
import useTranslation from '../../../hooks/useTranslation'

type UnstakePoolProps = {
  poolAddress: string
}

export default function WithdrawPool({ poolAddress }: UnstakePoolProps) {
  const { t } = useTranslation()

  const { pool } = usePool(poolAddress)

  return (
    <LayoutTemplate>
      <LayoutHead text={t('titles.stake')} />
      <StakeControl pool={pool} type='withdraw' />
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const params = context?.params as { address: `0x${string}` } | undefined

  // const { data } = await apolloClient.query<{ pool: Pool } | undefined>({
  //   query: queryPool,
  //   variables: { id: params?.address || '' }
  // })

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'], null, ['en'])),
      poolAddress: params?.address || ''
    }
  }
}
