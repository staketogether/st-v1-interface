import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { MetaTagsPoolDetail } from '@/components/shared/meta/MetaTagsPoolDetail'

import StakeControl from '@/components/stake/StakeControl'
import { contentfulClient } from '@/config/apollo'
import { queryContentfulPoolByAddress } from '@/queries/contentful/queryContentfulPoolByAddress'
import { ContentfulPool } from '@/types/ContentfulPool'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

type HomeProps = {
  poolAddress: `0x${string}`
  poolDetail?: ContentfulPool
}

export default function Home({ poolAddress, poolDetail }: HomeProps) {
  return (
    <LayoutTemplate>
      <MetaTagsPoolDetail poolDetail={poolDetail} />
      <StakeControl isStakeTogetherPool poolAddress={poolAddress} type='withdraw' poolDetail={poolDetail} />
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const stakeTogetherPool = '0x1b11ecba5e34ca0d9baa8d281faf0901c941f638'

  const { data } = await contentfulClient.query<{ poolCollection: { items: ContentfulPool[] } }>({
    query: queryContentfulPoolByAddress,

    variables: {
      walletAddress: stakeTogetherPool,
      locale: context.locale === 'en' ? 'en-US' : context.locale
    }
  })

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'])),
      poolAddress: stakeTogetherPool,
      poolDetail: data?.poolCollection.items[0] || null
    }
  }
}
