import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LayoutTemplate from '../../../../../components/shared/layout/LayoutTemplate'
import { MetaTagsPoolDetail } from '../../../../../components/shared/meta/MetaTagsPoolDetail'
import StakeControl from '../../../../../components/stake/StakeControl'
import { contentfulClient } from '@/config/apollo'
import { ContentfulPool } from '@/types/ContentfulPool'
import { queryContentfulPoolByAddress } from '@/queries/contentful/queryContentfulPoolByAddress'

type DepositProps = {
  poolAddress: `0x${string}`
  poolDetail?: ContentfulPool
}

export default function Deposit({ poolAddress, poolDetail }: DepositProps) {
  return (
    <LayoutTemplate>
      <MetaTagsPoolDetail poolDetail={poolDetail} />
      <StakeControl poolAddress={poolAddress} type='deposit' poolDetail={poolDetail} />
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const params = context?.params as { address: `0x${string}` } | undefined

  const { data } = await contentfulClient.query<{ poolCollection: { items: ContentfulPool[] } }>({
    query: queryContentfulPoolByAddress,

    variables: {
      walletAddress: params?.address.toLowerCase(),
      locale: context.locale === 'en' ? 'en-US' : context.locale
    }
  })

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'])),
      poolAddress: params?.address.toLowerCase() || '',
      poolDetail: data?.poolCollection.items[0] || null
    }
  }
}
