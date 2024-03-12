import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import PoolsControl from '../../../../components/invest/PoolsControl'
import LayoutTemplate from '../../../../components/shared/layout/LayoutTemplate'
import { Metatags } from '../../../../components/shared/meta/Metatags'
import { ethereumMainnetClient } from '../../../../config/apollo'
import { queryPools } from '../../../../queries/subgraph/queryPools'
import { PoolSubgraph } from '../../../../types/Pool'
import { queryStakeTogether } from '@/queries/subgraph/queryStakeTogether'
import { StakeTogether } from '@/types/StakeTogether'

type InvestProps = {
  pools: PoolSubgraph[]
  stakeTogether: StakeTogether
}

export default function Invest({ pools, stakeTogether }: InvestProps) {
  return (
    <LayoutTemplate>
      <Metatags />
      <PoolsControl pools={pools} stakeTogether={stakeTogether} />
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { data } = await ethereumMainnetClient.query<{ pools: PoolSubgraph[] }>({
    query: queryPools,
    fetchPolicy: 'no-cache'
  })

  const pools: PoolSubgraph[] = data.pools

  const { data: stakeTogether } = await ethereumMainnetClient.query<{ stakeTogether: StakeTogether }>({
    query: queryStakeTogether,
    fetchPolicy: 'no-cache'
  })

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'])),
      pools,
      stakeTogether: stakeTogether.stakeTogether
    }
  }
}
