import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import ExploreList from '../components/explore/ExploreList'
import LayoutHead from '../components/shared/layout/LayoutHead'
import LayoutTemplate from '../components/shared/layout/LayoutTemplate'
import { apolloClient } from '../config/apollo'
import useTranslation from '../hooks/useTranslation'
import { queryCommunitiesDelegations } from '../queries/queryCommunitiesDelegations'
import { Community } from '../types/Community'

type ExploreProps = {
  communities: Community[]
}

export default function Explore({ communities }: ExploreProps) {
  const { t } = useTranslation()

  return (
    <LayoutTemplate>
      <LayoutHead text={t('titles.explore')} />
      <ExploreList communities={communities} />
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { data } = await apolloClient.query<{ communities: Community[] }>({
    query: queryCommunitiesDelegations
  })

  const communities: Community[] = data.communities

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'], null, ['en'])),
      communities
    }
  }
}
