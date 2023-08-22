import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { GetServerSideProps } from 'next'
import PoolsControl from '../components/pools/PoolsControl'
import LayoutTemplate from '../components/shared/layout/LayoutTemplate'

import { MetaPools } from '../components/shared/meta/MetaPools'
import { apolloClient } from '../config/apollo'
import { queryPools } from '../queries/subgraph/queryPools'
import { PoolSubgraph } from '../types/Pool'

type PoolsProps = {
  pools: PoolSubgraph[]
}

export default function Pools({ pools }: PoolsProps) {
  return (
    <LayoutTemplate>
      <MetaPools />
      <PoolsControl pools={pools} />
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { data } = await apolloClient.query<{ pools: PoolSubgraph[] }>({
    query: queryPools,
    fetchPolicy: 'no-cache'
  })

  const pools: PoolSubgraph[] = data.pools

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'], null, ['en'])),
      pools
    }
  }
}
