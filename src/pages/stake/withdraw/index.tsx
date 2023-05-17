import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LayoutTemplate from '../../../components/shared/layout/LayoutTemplate'
import StakeForm from '../../../components/stake/StakeForm'
import StakeModalCommunities from '../../../components/stake/StakeModalCommunities'

export default function Unstake() {
  return (
    <LayoutTemplate>
      <StakeForm type='withdraw' />
      <StakeModalCommunities type='withdraw' />
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'], null, ['en']))
    }
  }
}
