import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import ExploreList from '../components/explore/ExploreList'
import LayoutHead from '../components/shared/layout/LayoutHead'
import LayoutTemplate from '../components/shared/layout/LayoutTemplate'
import useCommunities from '../hooks/subgraphs/useCommunities'
import useTranslation from '../hooks/useTranslation'

export default function Explore() {
  const { t } = useTranslation()

  const { communities } = useCommunities()

  return (
    <LayoutTemplate>
      <LayoutHead text={t('titles.explore')} />
      <ExploreList communities={communities} />
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  // const { data } = await apolloClient.query<{ communities: Community[] }>({
  //   query: queryCommunitiesDelegations
  // })

  // const communities: Community[] = data.communities

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'], null, ['en']))
      // communities
    }
  }
}
