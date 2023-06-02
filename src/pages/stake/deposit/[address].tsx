import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LayoutHead from '../../../components/shared/layout/LayoutHead'
import LayoutTemplate from '../../../components/shared/layout/LayoutTemplate'
import StakeControl from '../../../components/stake/StakeControl'
import { apolloClient } from '../../../config/apollo'
import useTranslation from '../../../hooks/useTranslation'
import { queryCommunity } from '../../../queries/queryCommunity'
import { Community } from '../../../types/Community'

type StakeCommunityProps = {
  community?: Community
}

export default function DepositCommunity({ community }: StakeCommunityProps) {
  const { t } = useTranslation()

  return (
    <LayoutTemplate>
      <LayoutHead text={t('titles.stake')} />
      <StakeControl community={community} type='deposit' />
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const params = context?.params as { address: `0x${string}` } | undefined

  const { data } = await apolloClient.query<{ community: Community } | undefined>({
    query: queryCommunity,
    variables: { id: params?.address.toLowerCase() || '' }
  })

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'], null, ['en'])),
      community: data?.community
    }
  }
}
