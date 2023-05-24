import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LayoutTemplate from '../../../components/shared/layout/LayoutTemplate'
import StakeForm from '../../../components/stake/StakeForm'
import StakeModalCommunities from '../../../components/stake/StakeModalCommunities'
import { apolloClient } from '../../../config/apollo'
import { queryCommunity } from '../../../queries/queryCommunity'
import { Community } from '../../../types/Community'

type StakeProps = {
  community?: Community
}

export default function Stake({ community }: StakeProps) {
  return (
    <LayoutTemplate>
      <StakeForm type='deposit' communityAddress={community?.address} />
      <StakeModalCommunities type='deposit' />
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const params = context?.params as { address: `0x${string}` } | undefined

  const { data } = await apolloClient.query<{ community: Community } | undefined>({
    query: queryCommunity,
    variables: { id: params?.address || '' }
  })

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'], null, ['en'])),
      community: data?.community
    }
  }
}
