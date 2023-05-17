import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LayoutTemplate from '../../components/shared/layout/LayoutTemplate'
import StakeForm from '../../components/stake/StakeForm'
import StakeModalCommunities from '../../components/stake/StakeModalCommunities'

type StakeCommunityProps = {
  address: `0x${string}`
}

export default function StakeCommunity({ address }: StakeCommunityProps) {
  return (
    <LayoutTemplate>
      <StakeForm communityAddress={address} type='stake' />
      <StakeModalCommunities type='stake' />
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { address } = context.params as { address: `0x${string}` }
  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'], null, ['en', 'es', 'pt'])),
      address
    }
  }
}
