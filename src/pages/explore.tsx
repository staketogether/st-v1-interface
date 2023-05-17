import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ExploreList from '../components/explore/ExploreList'
import LayoutTemplate from '../components/shared/layout/LayoutTemplate'

export default function Explore() {
  return (
    <LayoutTemplate>
      <ExploreList />
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'], null, ['en', 'es', 'pt']))
    }
  }
}
