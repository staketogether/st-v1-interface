import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LayoutHead from '../../../components/shared/layout/LayoutHead'
import LayoutTemplate from '../../../components/shared/layout/LayoutTemplate'
import StakeControl from '../../../components/stake/StakeControl'
import useCommunity from '../../../hooks/subgraphs/useCommunity'
import useTranslation from '../../../hooks/useTranslation'

type DepositCommunityProps = {
  communityAddress: string
}

export default function Deposit({ communityAddress }: DepositCommunityProps) {
  const { t } = useTranslation()

  const { community } = useCommunity(communityAddress)

  return (
    <LayoutTemplate>
      <LayoutHead text={t('titles.stake')} />
      <StakeControl community={community} type='deposit' />
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const params = context?.params as { address: `0x${string}` } | undefined

  // const { data } = await apolloClient.query<{ community: Community } | undefined>({
  //   query: queryCommunity,
  //   variables: { id: params?.address || '' }
  // })

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'], null, ['en'])),
      communityAddress: params?.address || ''
    }
  }
}
