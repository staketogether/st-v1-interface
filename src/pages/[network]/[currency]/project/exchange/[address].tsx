import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LayoutTemplate from '../../../../../components/shared/layout/LayoutTemplate'
import StakeControl from '../../../../../components/stake/StakeControl'
import { ContentfulPool } from '@/types/ContentfulPool'
import { queryContentfulPoolByAddress } from '@/queries/contentful/queryContentfulPoolByAddress'
import { contentfulClient } from '@/config/apollo'
import { MetaTagsPoolDetail } from '@/components/shared/meta/MetaTagsPoolDetail'

type ExchangeProps = {
  poolAddress: `0x${string}`
  poolDetail?: ContentfulPool
}

export default function Exchange({ poolAddress, poolDetail }: ExchangeProps) {
  return (
    <LayoutTemplate>
      <MetaTagsPoolDetail poolDetail={poolDetail} />
      <StakeControl poolAddress={poolAddress} type='exchange' poolDetail={poolDetail} />
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
