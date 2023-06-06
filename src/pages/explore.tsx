import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { GetServerSideProps } from 'next'
import ExploreList from '../components/explore/ExploreList'
import LayoutHead from '../components/shared/layout/LayoutHead'
import LayoutTemplate from '../components/shared/layout/LayoutTemplate'
import { MetaExplore } from '../components/shared/meta/MetaExplore'
import { apolloClient } from '../config/apollo'
import useTranslation from '../hooks/useTranslation'
import { queryPools } from '../queries/queryPools'
import { Pool } from '../types/Pool'

type ExploreProps = {
  pools: Pool[]
}

export default function Explore({ pools }: ExploreProps) {
  const { t } = useTranslation()

  return (
    <LayoutTemplate>
      <MetaExplore />
      <LayoutHead text={t('titles.explore')} />
      <ExploreList pools={pools} />
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { data } = await apolloClient.query<{ pools: Pool[] }>({
    query: queryPools,
    fetchPolicy: 'network-only'
  })

  const pools: Pool[] = data.pools

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'], null, ['en'])),
      pools
    }
  }
}
