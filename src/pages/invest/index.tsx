import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import PoolsControl from '../../components/pools/PoolsControl'
import LayoutTemplate from '../../components/shared/layout/LayoutTemplate'
import { Metatags } from '../../components/shared/meta/Metatags'
import { apolloClient } from '../../config/apollo'
import { queryPools } from '../../queries/subgraph/queryPools'
import { PoolSubgraph } from '../../types/Pool'

type InvestProps = {
  pools: PoolSubgraph[]
}

export default function Invest({ pools }: InvestProps) {
  return (
    <LayoutTemplate>
      <Metatags />
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
      ...(await serverSideTranslations(context.locale || 'en', ['common'])),
      pools
    }
  }
}
