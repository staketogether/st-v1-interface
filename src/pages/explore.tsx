import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ExploreList from '../components/explore/ExploreList'
import LayoutTemplate from '../components/shared/layout/LayoutTemplate'
import { apolloClient } from '../config/apollo'
import { queryCommunities } from '../queries/queryCommunities'
import { Community } from '../types/Community'

type ExploreProps = {
  communities: Community[]
}

export default function Explore({ communities }: ExploreProps) {
  return (
    <LayoutTemplate>
      <ExploreList communities={communities} />
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { data } = await apolloClient.query<{ communities: Community[] }>({
    query: queryCommunities
  })

  const { communities } = data

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'], null, ['en'])),
      communities: communities || []
    }
  }
}
