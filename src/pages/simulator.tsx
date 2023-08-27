import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LayoutTemplate from '../components/shared/layout/LayoutTemplate'
import { Metatags } from '../components/shared/meta/Metatags'

export default function Simulator() {
  return (
    <LayoutTemplate>
      <Metatags />
      <div>PUT CONTENT HERE</div>
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'pt', ['common']))
    }
  }
}
