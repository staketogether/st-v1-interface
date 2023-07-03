import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { GetServerSideProps } from 'next'
import PoolsList from '../components/pools/PoolsList'
import LayoutHead from '../components/shared/layout/LayoutHead'
import LayoutTemplate from '../components/shared/layout/LayoutTemplate'

import { MetaPools } from '../components/shared/meta/MetaPools'
import { apolloClient } from '../config/apollo'
import useTranslation from '../hooks/useTranslation'
import { queryPools } from '../queries/queryPools'
import { Pool } from '../types/Pool'

type PoolsProps = {
  pools: Pool[]
}

export default function Pools({ pools }: PoolsProps) {
  const { t } = useTranslation()

  return (
    <LayoutTemplate>
      <MetaPools />
      <LayoutHead text={t('titles.pools')} />
      <PoolsList pools={pools} />
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { data } = await apolloClient.query<{ pools: Pool[] }>({
    query: queryPools,
    fetchPolicy: 'no-cache'
  })

  const pools: Pool[] = data.pools

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'], null, ['en'])),
      pools
    }
  }
}
